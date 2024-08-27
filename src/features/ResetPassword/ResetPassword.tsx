import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { Box, TextField, Typography } from '@mui/material'
import { useStyles } from './resetPassword.styles'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'
import { useState } from 'react'
import Success from '../../components/Success/Success'
import GirlOk from '../../assets/images/GirlOk'

const ResetPassword = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { classes: styles } = useStyles()
  const { resetPassword } = useAuthService()
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')

  if (user) {
    navigate('/home')
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleResetPassword = async () => {
    if (validateEmail(email)) {
      await resetPassword(email)
      setSuccess(true)
    } else {
      setEmailError(t('invalidEmail'))
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (emailError) setEmailError('')
  }

  const navigateHome = () => {
    navigate('/home')
  }

  return (
    <Box className={styles.loginContainer}>
      {loading && <Loader />}
      {success ? (
        <Success
          Image={GirlOk}
          title={t('emailSent')}
          subTitle={t('checkYourInbox')}
          maxWidth={500}
          buttonTitle={t('backToLogin')}
          onClickButton={navigateHome}
        />
      ) : (
        <Box className={styles.loginBox}>
          <Typography>{t('resetPassword')}</Typography>
          <TextField
            name='email'
            label={t('email')}
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin='normal'
            variant='outlined'
            error={!!emailError}
            helperText={emailError || ' '}
          />
          <FButton onClick={handleResetPassword} title={t('resetPassword')} />
        </Box>
      )}
    </Box>
  )
}

export default ResetPassword
