import { useState } from 'react'
import FForm from '../../components/FForm'
import FContainer from '../../components/FContainer'
import FInput from '../../components/FInput'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FButton from '../../components/FButton/FButton'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'
import { useAddSupport } from '../../framework/api/supportApi'
import Loader from '../../components/Loader'
import { SupportQueryUpload } from '../../framework/types'
import Success from '../../components/Success/Success'
import GirlOk from '../../assets/images/GirlOk'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles()((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: 32,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 25,
  },
}))

const Support = () => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const { addNewSupport, isLoading } = useAddSupport()
  const [showSuccess, setShowSuccess] = useState(false)
  const supportOptions = [
    { value: 'Publicaciones', label: t('publicationsProblem') },
    { value: 'Perfil', label: t('profileProblem') },
    { value: 'Cuenta', label: t('verificationProblem') },
    { value: 'Otros', label: t('others') },
  ]
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      subject: '',
      description: '',
    },
  })
  const handleSubmitSupport = async (data: SupportQueryUpload) => {
    const result = await addNewSupport(data)
    if (result) {
      setShowSuccess(true)
    }
  }
  const navigateHome = () => {
    navigate('/')
  }
  if (isLoading) return <Loader />

  return showSuccess ? (
    <Success
      Image={GirlOk}
      title={t('querySent')}
      subTitle={t('querySentSubtitle')}
      maxWidth={500}
      buttonTitle={t('back')}
      onClickButton={navigateHome}
    />
  ) : (
    <FContainer>
      <FForm formTitle={t('queries')} formSubtitle={t('supportSubtitle')}>
        <Box className={styles.formContainer}>
          <FInput
            name='subject'
            type='select'
            options={supportOptions}
            control={control}
            label={t('subject')}
            rules={{ required: t('requiredField') }}
            error={errors.subject}
            placeholder={t('chooseAnOption')}
          />
          <FInput
            name='description'
            type='text'
            control={control}
            label={t('description')}
            rules={{ required: t('requiredField') }}
            error={errors.subject}
            placeholder={t('writeYourQuery')}
            rows={6}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 150,
              },
            }}
          />
        </Box>
      </FForm>
      <Box className={styles.buttonContainer}>
        <FButton
          title={t('send')}
          onClick={handleSubmit(handleSubmitSupport)}
        />
      </Box>
    </FContainer>
  )
}

export default Support
