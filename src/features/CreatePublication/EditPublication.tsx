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
import {
  useGetProductsById,
  useUpdateProduct,
} from '../../framework/api/productApi'
import { useParams } from 'react-router-dom'
import { publicationsDefaultValues } from '../../framework/constants/publicationsDefaultValues'
import { Product } from '../../framework/types'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: 880,
    padding: 25,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
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

const EditPublication = () => {
  const { publicationId } = useParams()
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadImage } = useUploadImage()
  const [activeStep, setActiveStep] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [photo1, setPhoto1] = useState<File | null>(null)
  const [photo2, setPhoto2] = useState<File | null>(null)
  const [photo3, setPhoto3] = useState<File | null>(null)
  const { userData } = useSelector((state: RootState) => state.auth)

  const { product, isLoading } = useGetProductsById(publicationId || '')
  const { updateProductData, isUpdating } = useUpdateProduct()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = useForm<Product>({
    mode: 'onBlur',
    defaultValues: publicationsDefaultValues,
    shouldUnregister: false,
  })

  useEffect(() => {
    if (product?.length && !isLoading) {
      reset({
        title: product[0].title,
        currency: product[0].currency,
        price: product[0].price,
        applyPrice: product[0].applyPrice,
        description: product[0].description,
        photo1Url: product[0].photo1Url,
        photo2Url: product[0].photo2Url,
        photo3Url: product[0].photo3Url,
        category: product[0].category,
        subCategory: product[0].subCategory,
        condition: product[0].condition,
        brand: product[0].brand || '',
        model: product[0].model || '',
        year: product[0].year,
        size: product[0].size,
        homologation: product[0].homologation,
        competition: product[0].competition,
      })
    }
  }, [product, isLoading, reset])

  const values = watch()

  useEffect(() => {
    const checkIsNextDisabled = () => {
      const hasErrors = Object.keys(errors).length > 0
      if (activeStep === 0) {
        const firstStepValues = {
          title: values.title,
          currency: values.currency,
          price: values.price,
          description: values.description,
        }
        const hasEmptyFields = Object.values(firstStepValues).some(
          (value) => value === '' || value === undefined
        )

        const photosProvided = photo1 || values.photo1Url
        setIsNextDisabled(hasErrors || hasEmptyFields || !photosProvided)
      } else if (activeStep === 1) {
        setIsNextDisabled(hasErrors)
      }
    }
    checkIsNextDisabled()
  }, [
    errors,
    values,
    activeStep,
    photo1,
    photo2,
    photo3,
    values.photo1Url,
    values.photo2Url,
    values.photo3Url,
  ])

  useEffect(() => {
    if (values.applyPrice) {
      setValue('currency', '')
      setValue('price', '')
      clearErrors('price')
      clearErrors('currency')
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
      photo1={values.photo1Url}
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

  const onSubmit = async (data: Product) => {
    const photo1Url = photo1 ? await uploadImage(photo1) : data.photo1Url
    const photo2Url = photo2 ? await uploadImage(photo2) : data.photo2Url
    const photo3Url = photo3 ? await uploadImage(photo3) : data.photo3Url
    const productToUpdate = {
      ...data,
      brand: data.brand ? data.brand : '',
      model: data.model ? data.model : '',
      photo1Url,
      photo2Url,
      photo3Url,
      uid: userData?.uid,
      active: userData?.verifiedStatus === 'verified' ? true : false,
      id: publicationId,
    }
    updateProductData(productToUpdate)

    navigate('/home')
  }

  if (isLoading || !product || isUpdating) {
    return <Loader />
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.formContainer}>
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
      </Box>
    </Box>
  )
}

export default EditPublication
