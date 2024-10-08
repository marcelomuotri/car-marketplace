import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import FForm from '../../../components/FForm'
import FInput from '../../../components/FInput'
import UploadImage from '../../../components/UploadImage'
import { provinces } from '../../../framework/constants/provinces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../framework/state/store'
import { useTranslation } from 'react-i18next'
import { useAuthService } from '../../../framework/state/services/authService'
import { useEffect, useState } from 'react'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileContainer: {
    maxWidth: 980,
    padding: '25px 25px 0px 25px',
  },
  body: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  gridContainer: {
    marginTop: 1,
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  bodyLeft: {
    width: '57%',
    borderRight: '1px solid black',
    borderColor: theme.palette.grey[300],
    paddingRight: 25,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRight: 'none',
      paddingRight: 0,
    },
  },
  bodyRight: {
    width: '43%',
    paddingLeft: 25,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingLeft: 0,
    },
  },
  fontTitle: {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 16,
  },
  fontTitleSub: {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
  },
}))

interface ErrorState {
  message: string
}

const EditProfileForm = ({
  control,
  errors,
  setPhotoToShow,
  photoToShowUrl,
  photoToShow,
  values,
}: any) => {
  const { classes: styles } = useStyles()
  const { userData } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()
  const { searchUserByDNI } = useAuthService()
  const [dniError, setDniError] = useState<ErrorState | null>(null)
  const [loadingDni, setLoadingDni] = useState(false)
  const [hasDniChanged, setHasDniChanged] = useState(false)

  useEffect(() => {
    if (values.dni === userData.dni) return
    // Debounce: Espera 5 segundos después del último cambio en el DNI
    setDniError(null)
    if (values.dni) setLoadingDni(true)

    const handler = setTimeout(async () => {
      if (values.dni) {
        setLoadingDni(true)
        try {
          const dniExists = await searchUserByDNI(values.dni)
          if (dniExists) {
            setDniError({ message: t('dniAlreadyExists') })
          } else {
            setDniError(null)
          }
        } catch (error) {
          setDniError({ message: t('errorCheckingDNI') })
        }
      }
      setLoadingDni(false)
    }, 3000) //3000

    return () => {
      clearTimeout(handler) // Limpia el timeout si el DNI cambia antes de los 5 segundos
    }
  }, [values.dni])

  return (
    <FForm
      title={t('profileData')}
      formTitle={t('confirmProfileData')}
      formSubtitle={t('completeAndConfirmData')}
    >
      <Box className={styles.body}>
        <Box className={styles.bodyLeft}>
          <Box>
            <Typography className={styles.fontTitle}>
              {t('personalData').toUpperCase()}
            </Typography>
            <Grid
              container
              columnSpacing={25}
              rowSpacing={13}
              className={styles.gridContainer}
            >
              <Grid item md={6}>
                <FInput
                  name='name'
                  type='text'
                  control={control}
                  label={t('firstName')}
                  rules={{ required: t('requiredField') }}
                  error={errors.name}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                  placeholder='Mario'
                />
              </Grid>
              <Grid item md={6} sx={{ display: 'flex' }}>
                <FInput
                  name='dni'
                  type='number'
                  control={control}
                  label={t('dni')}
                  rules={{ required: t('requiredField') }}
                  error={errors.dni || dniError}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                  placeholder='34543211'
                />
                <Box sx={{ alignSelf: 'end', marginBottom: 7, marginLeft: 10 }}>
                  {loadingDni && <CircularProgress size={20} />}
                </Box>
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='surname'
                  type='text'
                  control={control}
                  label={t('lastName')}
                  rules={{ required: t('requiredField') }}
                  error={errors.surname}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                  placeholder='Casas'
                />
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='birthdate'
                  type='date'
                  control={control}
                  label={t('birthDate')}
                  rules={{ required: t('requiredField') }}
                  error={errors.birthdate}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography className={styles.fontTitle} sx={{ marginTop: 20 }}>
              {t('contactAndAddress')}
            </Typography>
            <Grid
              container
              columnSpacing={25}
              rowSpacing={13}
              className={styles.gridContainer}
            >
              <Grid item md={6}>
                <FInput
                  name='contactEmail'
                  type='text'
                  control={control}
                  label={t('contactEmail')}
                  rules={{ required: t('requiredField') }}
                  error={errors.contactEmail}
                  validationType='email'
                  placeholder='mario@casas.com.ar'
                />
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='phoneNumber'
                  type='text'
                  control={control}
                  label={t('phoneNumber')}
                  rules={{ required: t('requiredField') }}
                  error={errors.phoneNumber}
                  placeholder='15 55 67 89 90'
                />
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='address'
                  type='text'
                  control={control}
                  label={t('address')}
                  rules={{ required: t('requiredField') }}
                  error={errors.address}
                  placeholder='Amenabar 1567'
                />
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='city'
                  type='text'
                  control={control}
                  label={t('city')}
                  rules={{ required: t('requiredField') }}
                  error={errors.city}
                  placeholder='Buenos aires'
                />
              </Grid>
              <Grid item md={6}>
                <FInput
                  name='state'
                  type='select'
                  label={t('state')}
                  control={control}
                  rules={{ required: t('requiredField') }}
                  error={errors.state}
                  options={provinces}
                  placeholder='Buenos Aires'
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={styles.bodyRight}>
          <Box>
            <Typography className={styles.fontTitle}>
              {t('accountData')}
            </Typography>
            <Grid container rowSpacing={13} className={styles.gridContainer}>
              <Grid item md={12}>
                <FInput
                  name='nameToShow'
                  type='text'
                  control={control}
                  label={t('displayName')}
                  rules={{ required: t('requiredField') }}
                  error={errors.nameToShow}
                  placeholder='Ford Argentina'
                />
              </Grid>
              <Grid item md={12}>
                <FInput
                  name='description'
                  type='text'
                  control={control}
                  label={t('description')}
                  rows={6}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      minHeight: 150,
                    },
                  }}
                  rules={{ required: t('requiredField') }}
                  error={errors.description}
                  placeholder={t('placeHolderProfileDescription')}
                />
              </Grid>
              <Grid item md={12}>
                <UploadImage
                  image={photoToShow}
                  setImage={setPhotoToShow}
                  title={t('displayPhoto')}
                  subTitle={t('uploadPhotoSubTitle')}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* Form fields go here */}
    </FForm>
  )
}

export default EditProfileForm
