import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Step1 from './Step1/Step1'
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
import { convertDatesToISOString } from '../../framework/utils/dayjsConverter'
import VerifySuccess from './VerifySuccess/VerifySuccess'

interface FormValues {
  name: string
  surname: string
  dni: string
  birthdate: Date | null
}

const VerifyId = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { uploadImage } = useUploadImage()
  const { updateUserToFirestore, fetchUserData } = useAuthService()
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [photoProfile, setPhotoProfile] = useState<File | null>(null)
  const [photoFrontID, setPhotoFrontID] = useState<File | null>(null)
  const [photoBackID, setPhotoBackID] = useState<File | null>(null)
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
      name: '',
      surname: '',
      dni: '',
      birthdate: null,
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
        setIsNextDisabled(hasEmptyPhoto)
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
    <Step1 control={control} errors={errors} />,
    <Step2
      control={control}
      errors={errors}
      setPhotoProfile={setPhotoProfile}
      setPhotoFrontID={setPhotoFrontID}
      setPhotoBackID={setPhotoBackID}
    />,
  ]

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit(onSubmit)()
      setShowSuccess(true)
      //fetchUserData(userData?.uid)
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

    const userDataToUpdate = {
      ...data,
      photoProfileUrl: photoProfileUrl,
      photoFrontIdUrl: photoFrontIDUrl,
      photobackIdUrl: photoBackIDUrl,
      verifiedStatus: 'pending',
    }
    const parsedUserData = convertDatesToISOString(userDataToUpdate)
    updateUserToFirestore(parsedUserData, userData?.uid)
  }

  return (
    <Box className={styles.container}>
      {showSuccess ? (
        <VerifySuccess />
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

export default VerifyId
