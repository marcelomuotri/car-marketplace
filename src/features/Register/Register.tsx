import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useStyles } from './register.styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import FTextInput from '../../components/FTextInput/FTextInput'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'
import { Link, Router, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'
import logo from '../../assets/images/icon1.png'
import { useState } from 'react'

interface RegisterFormFieldsProps {
  email: string
  password: string
  repeatPassword: string
}

const Register = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { classes: styles } = useStyles()
  const { createUser } = useAuthService()
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [sendEmailScreen, setSendEmailScreen] = useState(false)
  console.log(error)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormFieldsProps>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  const onHandleRegister: SubmitHandler<RegisterFormFieldsProps> = async (
    data
  ) => {
    const user = await createUser(data)

    setSendEmailScreen(true) // Activar el estado de pantalla de envío de email
  }

  const navigateToLogin = () => {
    navigate('/')
  }

  return (
    <Box className={styles.registerContainer}>
      {loading && <Loader />}

      <Box
        display='flex'
        flexDirection={matchesDownSm ? 'column' : 'row'}
        alignItems='center'
        justifyContent='center'
      >
        <Box sx={{ width: '50%' }}>
          <img src={logo} alt='logo' className={styles.image} />
        </Box>
        {sendEmailScreen ? (
          <Box
            className={styles.registerBox}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            <Typography className={styles.emailTitle}>
              Verificá tu bandeja de entrada
            </Typography>
            <Typography>
              Te mandamos un mail para verificar tu cuenta. Hacé clic en el
              enlace para confirmarla y volvé cuando termines.
            </Typography>
            <FButton title='Volver' onClick={navigateToLogin} />
          </Box>
        ) : (
          <Box
            className={styles.registerBox}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            <Typography>{t('register')}</Typography>
            <FTextInput
              name='email'
              control={control}
              label='Email'
              error={errors.email}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
            />
            <FTextInput
              name='password'
              control={control}
              label='Password'
              error={errors.password}
              rules={{
                required: 'Password is required',
                maxLength: { value: 20, message: 'Max length is 20' },
              }}
              type='password'
            />
            <FTextInput
              name='repeatPassword'
              control={control}
              label='Repetir password'
              error={errors.repeatPassword}
              rules={{
                required: 'Password is required',
                maxLength: { value: 20, message: 'Max length is 20' },
              }}
              type='password'
            />
            <FButton
              onClick={handleSubmit(onHandleRegister)}
              title={t('register')}
            />
            {error && <Typography color='red'>{error}</Typography>}
            <Typography>
              {t('alreadyHaveAccount')}{' '}
              <Link
                to='/login'
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                {t('login')}
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Register
