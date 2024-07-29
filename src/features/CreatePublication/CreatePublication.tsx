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
import { useProductService } from '../../framework/state/services/productService'
import Loader from '../../components/Loader'
import Success from '../../components/Success/Success'
import GirlOk from '../../assets/images/GirlOk'

interface FormValues {
  title: string
  currency: string | ''
  price: number | ''
  description: string
  photo1Url: string
  photo2Url: string
  photo3Url: string
  applyPrice: boolean
  category: string
  subCategory: string
  condition: string
  brand: string
  model: string
  year: string
  size: string
  homologation: boolean | null
  competition: string[]
}

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

const CreatePublication = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadImage } = useUploadImage()
  const { createProduct, loading } = useProductService()
  const [activeStep, setActiveStep] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [photo1, setPhoto1] = useState<File | null>(null)
  const [photo2, setPhoto2] = useState<File | null>(null)
  const [photo3, setPhoto3] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const { userData } = useSelector((state: RootState) => state.auth)
  console.log(userData)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      currency: '',
      price: '',
      applyPrice: false,
      description: '',
      photo1Url: '',
      photo2Url: '',
      photo3Url: '',
      category: '',
      subCategory: '',
      condition: '',
      brand: '',
      model: '',
      year: '',
      size: '',
      homologation: null,
      competition: [],
    },
    shouldUnregister: false,
  })

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
        setIsNextDisabled(hasErrors || hasEmptyFields || !photo1)
      } else if (activeStep === 1) {
        setIsNextDisabled(hasErrors)
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

  const onSubmit = async (data: FormValues) => {
    const photo1Url = photo1 ? await uploadImage(photo1) : null
    const photo2Url = photo2 ? await uploadImage(photo2) : null
    const photo3Url = photo3 ? await uploadImage(photo3) : null
    const productToCreate = {
      ...data,
      brand: data.brand ? data.brand.value : '',
      model: data.model ? data.model.value : '',
      photo1Url,
      photo2Url,
      photo3Url,
      uid: userData?.uid || '',
      active: userData?.verifiedStatus === 'verified' ? true : false,
    }

    createProduct(productToCreate)
    setShowSuccess(true)
  }

  const navigateHome = () => {
    navigate('/home')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Box className={styles.container}>
      {showSuccess ? (
        <Success
          Image={GirlOk}
          title='¡Tu producto ha sido publicado correctamente!'
          maxWidth={500}
          buttonTitle='Volver a publicaciones'
          onClickButton={navigateHome}
        />
      ) : (
        <Box className={styles.formContainer}>
          <Box>{steps[activeStep]}</Box>
          <Box className={styles.buttonContainer}>
            <FButton
              variant='outlined'
              onClick={handleBack}
              title={t('back')}
            />
            <FButton
              variant='contained'
              onClick={handleNext}
              disabled={isNextDisabled}
              title={activeStep === steps.length - 1 ? t('end') : t('next')}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CreatePublication
