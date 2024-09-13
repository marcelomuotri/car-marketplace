import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { useStyles } from './login.styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import FTextInput from '../../components/FTextInput/FTextInput'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import logo from '../../assets/images/icon1.png'
import { useEffect, useState } from 'react'

interface LoginFormFieldsProps {
  email: string
  password: string
}

const Login = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()
  const navigation = useNavigate()
  const { classes: styles } = useStyles()
  const { loginUser, signInWithGoogle } = useAuthService()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormFieldsProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const theme = useTheme()
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [persistUser, setpersistUser] = useState<any>()

  if (user) {
    navigation('/home')
  }

  const onHandleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    const user = await loginUser(data)
    setpersistUser(user)
    if (user?.emailVerified) {
      navigation('/')
    }
  }

  useEffect(() => {
    if (error === 'notVerified') {
      setShowEmailVerification(true)
    }
  }, [error])

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account', // Fuerza a seleccionar una cuenta cada vez
    })

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      if (user) {
        await signInWithGoogle(result)
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      // Maneja el error según sea necesario
    }
  }

  const onResendEmailVerification = () => {
    sendEmailVerification(persistUser)
    navigation('/')
  }

  const navigateToLogin = () => {
    navigation('/')
  }

  return (
    <Box className={styles.loginContainer}>
      {loading && <Loader />}
      <Box sx={{ width: '50%' }}>
        <img src={logo} className={styles.image} />
      </Box>
      <Box className={styles.loginBox} style={{ opacity: loading ? 0.5 : 1 }}>
        {showEmailVerification ? (
          <Box sx={{ gap: 20, flexDirection: 'column', display: 'flex' }}>
            <Typography className={styles.emailTitle}>
              Verificá tu email para ingresar
            </Typography>
            <Typography>
              Te mandamos un mail para verificar tu cuenta. Hacé click en el
              enlace para confirmarla y volvé cuando termines.
            </Typography>
            <Typography>
              Si no te llegó el mail,{' '}
              <Button
                onClick={onResendEmailVerification}
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                  fontWeight: '400',
                  padding: 0,
                  marginBottom: 4,
                }}
              >
                hace click acá
              </Button>{' '}
              y te lo volvemos a enviar.
            </Typography>
            <FButton title='Volver' onClick={navigateToLogin} />
          </Box>
        ) : (
          <>
            <Typography>{t('login')}</Typography>
            <FTextInput
              name='email'
              control={control}
              label='Email'
              error={errors.email}
              rules={{
                required: 'Email is required',
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
            <FButton onClick={handleSubmit(onHandleLogin)} title={'login'} />
            <FButton
              onClick={handleSignInWithGoogle}
              title={'Sign in with google'}
            />
            {error === 'incorrectPassword' && (
              <Typography color='red'>
                Usuario o contraseña incorrecta
              </Typography>
            )}
            <Typography>
              Ya tienes cuenta?{' '}
              <Link
                to='/register'
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                Regístrate
              </Link>
            </Typography>
            <Typography>
              Olvidaste la contraseña?{' '}
              <Link
                to='/resetPassword'
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                }}
              >
                Recuperala
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Login
