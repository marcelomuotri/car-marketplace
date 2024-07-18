import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { Box, Typography } from '@mui/material'
import { useStyles } from './register.styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import FTextInput from '../../components/FTextInput/FTextInput'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'

interface RegisterFormFieldsProps {
  email: string
  password: string
  repeatPassword: string
}

const Register = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()
  const navigation = useNavigate()
  const { classes: styles } = useStyles()
  const { createUser } = useAuthService()
  const theme = useTheme()

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
    if (user) {
      navigation('/')
    }
  }

  return (
    <Box className={styles.registerContainer}>
      {loading && <Loader />}
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
        {error && <Typography color='red'>{t('usedEmail')}</Typography>}
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
    </Box>
  )
}

export default Register
