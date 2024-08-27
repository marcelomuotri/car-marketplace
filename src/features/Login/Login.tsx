import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { Box, Typography } from '@mui/material'
import { useStyles } from './login.styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import FTextInput from '../../components/FTextInput/FTextInput'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'

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
  if (user) {
    navigation('/home')
  }

  const onHandleLogin: SubmitHandler<LoginFormFieldsProps> = async (data) => {
    const user = await loginUser(data)
    if (user) {
      navigation('/')
    }
  }

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
        navigation('/')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      // Maneja el error según sea necesario
    }
  }

  return (
    <Box className={styles.loginContainer}>
      {loading && <Loader />}
      <Box className={styles.loginBox} style={{ opacity: loading ? 0.5 : 1 }}>
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
        {error && (
          <Typography color='red'>Usuario o contraseña incorrecta</Typography>
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
      </Box>
    </Box>
  )
}

export default Login
