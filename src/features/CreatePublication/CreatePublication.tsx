import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import FButton from '../../components/FButton/FButton'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useUploadImage } from '../../framework/state/services/uploadImageService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import CreateStep1 from './Step1/CreateStep1'
import CreateStep2 from './Step2/CreateStep2'
import PublicationResume from './Step3/PublicationResume'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import Loader from '../../components/Loader'
import Success from '../../components/Success/Success'
import GirlOk from '../../assets/images/GirlOk'
import { useAddProduct } from '../../framework/api/productApi'
import { ProductUpload } from '../../framework/types'
import { publicationsDefaultValues } from '../../framework/constants/publicationsDefaultValues'
import FContainer from '../../components/FContainer'

const useStyles = makeStyles()((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: 32,
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}))

const CreatePublication = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadImage, uploading } = useUploadImage()
  const { addNewProduct, isLoading } = useAddProduct()
  const [activeStep, setActiveStep] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [photo1, setPhoto1] = useState<File | null>(null)
  const [photo2, setPhoto2] = useState<File | null>(null)
  const [photo3, setPhoto3] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const { userData } = useSelector((state: RootState) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductUpload>({
    mode: 'onBlur',
    defaultValues: publicationsDefaultValues,
    shouldUnregister: false,
  })

  const values = watch()

  const variants = [
    {
      category: ['autos', 'motos', 'kartings', 'ATVs'],
      fields: ['condition', 'brand', 'model', 'subCategory', 'year'],
    },
    {
      category: ['indumentaria'],
      fields: ['condition', 'size', 'homologation', 'competition'],
    },
    {
      category: ['motores', 'partes', 'accesorios', 'herramientas'],
      fields: ['condition', 'competition'],
    },
    {
      category: ['servicios'],
      fields: ['competition'],
    },
  ]

  const fieldsToCheck = variants.find((variant) =>
    variant.category.includes(values.category ?? '')
  )

  useEffect(() => {
    const checkIsNextDisabled = () => {
      const hasErrors = Object.keys(errors).length > 0
      if (activeStep === 0) {
        const firstStepValues: any = {
          title: values.title,
          description: values.description,
        }
        if (!values.applyPrice) {
          firstStepValues.currency = values.currency
          firstStepValues.price = values.price
        }

        const hasEmptyFields = Object.values(firstStepValues).some(
          (value) => value === '' || value === undefined
        )
        setIsNextDisabled(hasErrors || hasEmptyFields || !photo1)
      } else if (activeStep === 1) {
        const secondStepValues: any = {
          category: values.category,
          subCategory: values.subCategory,
        }
        if (fieldsToCheck) {
          fieldsToCheck.fields.forEach((field) => {
            secondStepValues[field] = values[field]
          })
        }
        const hasEmptyFields = Object.values(secondStepValues).some(
          (value) =>
            value === '' ||
            value === undefined ||
            value === null ||
            (Array.isArray(value) && value.length === 0)
        )
        setIsNextDisabled(hasErrors || hasEmptyFields)
      }
    }
    checkIsNextDisabled()
  }, [errors, values, activeStep, photo1, photo2, photo3])

  useEffect(() => {
    if (values.applyPrice) {
      setValue('currency', '')
      setValue('price', '')
    }
  }, [values.applyPrice, setValue])

  const steps = [
    <CreateStep1
      control={control}
      errors={errors}
      setPhoto1={setPhoto1}
      setPhoto2={setPhoto2}
      setPhoto3={setPhoto3}
      isDisabled={values.applyPrice}
    />,
    <CreateStep2
      control={control}
      errors={errors}
      watch={watch}
      setValue={setValue}
      selectedCategory={values.category}
    />,
    <PublicationResume
      values={values}
      photo1={photo1}
      photo2={photo2}
      photo3={photo3}
    />,
  ]

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/home')
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  const onSubmit = async (data: ProductUpload) => {
    const photo1Url = photo1 ? await uploadImage(photo1) : null
    const photo2Url = photo2 ? await uploadImage(photo2) : null
    const photo3Url = photo3 ? await uploadImage(photo3) : null

    const productToCreate = {
      ...data,
      title: data.title.toLowerCase(),
      brand: !data.brand
        ? '' // Si no existe, lo dejamos como una cadena vacía
        : typeof data.brand === 'string'
          ? { label: data.brand, value: data.brand } // Si es un string, lo convertimos en un objeto
          : data.brand, // Si ya es un objeto, lo dejamos como está
      // Para model, hacemos lo mismo
      model: !data.model
        ? '' // Si no existe, lo dejamos como una cadena vacía
        : typeof data.model === 'string'
          ? { label: data.model, value: data.model } // Si es un string, lo convertimos en un objeto
          : data.model, // Si ya es un objeto, lo dejamos como está
      photo1Url,
      photo2Url,
      photo3Url,
      uid: userData?.uid || '',
      active: userData?.verifiedStatus === 'verified' ? true : false,
    }

    if (variants[0].category.includes(data.category as string)) {
      const categoryWithoutS = data?.category?.toLowerCase().endsWith('s')
        ? data?.category?.toLowerCase().slice(0, -1)
        : data?.category?.toLowerCase()

      productToCreate.competition = [`${categoryWithoutS}`]
    }

    addNewProduct(productToCreate)

    setShowSuccess(true)
  }

  const navigateHome = () => {
    navigate('/home')
  }

  if (isLoading || uploading) {
    return <Loader />
  }

  return showSuccess ? (
    <Success
      Image={GirlOk}
      title={t('publicationSuccess')}
      maxWidth={500}
      buttonTitle={t('backToPublications')}
      onClickButton={navigateHome}
    />
  ) : (
    <FContainer>
      <Box>{steps[activeStep]}</Box>
      <Box className={styles.buttonContainer}>
        <FButton variant='outlined' onClick={handleBack} title={t('back')} />
        <FButton
          variant='contained'
          onClick={handleNext}
          disabled={isNextDisabled}
          title={activeStep === steps.length - 1 ? t('end') : t('next')}
        />
      </Box>
    </FContainer>
  )
}

export default CreatePublication
