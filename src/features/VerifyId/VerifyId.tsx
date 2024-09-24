import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Step2 from './Step2/Step2'
import FButton from '../../components/FButton/FButton'
import { useStyles } from './verifyId.styles'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useUploadImage } from '../../framework/state/services/uploadImageService'
import { useAuthService } from '../../framework/state/services/authService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import {
  convertDatesToISOString,
  convertISOStringToDayjs,
} from '../../framework/utils/dayjsConverter'
import EditProfileForm from '../EditProfile/Components/EditProfileForm'
import { Dayjs } from 'dayjs'
import Success from '../../components/Success/Success'
import BoySleeping from '../../assets/images/BoySleeping'
import FContainer from '../../components/FContainer'

interface FormValues {
  name: string
  dni: string
  surname: string
  birthdate: Dayjs
  contactEmail: string
  phoneNumber: string
  address: string
  city: string
  state: string
  nameToShow: string
  description: string
  profilePhoto: string
}

const VerifyId = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadImage } = useUploadImage()
  const { updateUserToFirestore } = useAuthService()
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [photoProfile, setPhotoProfile] = useState<File | null>(null)
  const [photoFrontID, setPhotoFrontID] = useState<File | null>(null)
  const [photoBackID, setPhotoBackID] = useState<File | null>(null)
  const [photoToShow, setPhotoToShow] = useState<File | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const { userData } = useSelector((state: RootState) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: userData?.name || '',
      dni: userData?.dni || '',
      surname: userData?.surname || '',
      birthdate: convertISOStringToDayjs(userData?.birthdate) || '',
      contactEmail: userData?.contactEmail || '',
      phoneNumber: userData?.phoneNumber || '',
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
      nameToShow: userData?.nameToShow || '',
      description: userData?.description || '',
    },
  })

  const values = watch()

  useEffect(() => {
    const checkIsNextDisabled = () => {
      const values = getValues()
      const hasErrors = Object.keys(errors).length > 0

      if (activeStep === 0) {
        const hasEmptyFields = Object.values(values).some(
          (value) => value === '' || value === undefined
        )
        setIsNextDisabled(hasErrors || hasEmptyFields)
      } else if (activeStep === 1) {
        const hasEmptyPhoto = !photoProfile || !photoFrontID || !photoBackID
        setIsNextDisabled(hasEmptyPhoto || !termsAccepted)
      }
    }
    checkIsNextDisabled()
  }, [
    errors,
    values,
    getValues,
    activeStep,
    photoProfile,
    photoFrontID,
    photoBackID,
  ])

  const steps = [
    <EditProfileForm
      control={control}
      errors={errors}
      photoToShow={photoToShow}
      setPhotoToShow={setPhotoToShow}
      photoToShowUrl={userData?.photoToShowUrl}
      values={values}
    />,
    <Step2
      control={control}
      errors={errors}
      photoProfile={photoProfile}
      photoFrontID={photoFrontID}
      photoBackID={photoBackID}
      setPhotoProfile={setPhotoProfile}
      setPhotoFrontID={setPhotoFrontID}
      setPhotoBackID={setPhotoBackID}
      termsAccepted={termsAccepted}
      setTermsAccepted={setTermsAccepted}
    />,
  ]

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)()
      setShowSuccess(true)
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
    const photoProfileUrl = photoProfile
      ? await uploadImage(photoProfile)
      : null
    const photoFrontIDUrl = photoFrontID
      ? await uploadImage(photoFrontID)
      : null
    const photoBackIDUrl = photoBackID ? await uploadImage(photoBackID) : null
    const photoToShowUrl = photoToShow ? await uploadImage(photoToShow) : null

    const userDataToUpdate = {
      ...data,
      photoToShowUrl: photoToShowUrl,
      photoProfileUrl: photoProfileUrl,
      photoFrontIdUrl: photoFrontIDUrl,
      photobackIdUrl: photoBackIDUrl,
      verifiedStatus: 'pending',
    }
    const parsedUserData = convertDatesToISOString(userDataToUpdate)
    updateUserToFirestore(parsedUserData, userData?.uid)
  }

  const navigateHome = () => {
    navigate('/createPublication')
  }

  return showSuccess ? (
    <Success
      Image={BoySleeping}
      title={t('verificationRequestSubmitted')}
      subTitle={t('youWillReceiveTheConfirmationSoon')}
      buttonTitle={'Crear tu primera publicación'}
      onClickButton={navigateHome}
    />
  ) : (
    <FContainer>
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
    </FContainer>
  )
}

export default VerifyId
