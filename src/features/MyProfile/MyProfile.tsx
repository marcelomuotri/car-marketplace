import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import Tick from '../../assets/icons/Tick'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import EditIcon from '../../assets/icons/EditIcon'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { formattedDate } from '../../framework/utils/dayjsConverter'
import FModal from '../../components/FModal/FModal'
import FInput from '../../components/FInput'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuthService } from '../../framework/state/services/authService'

interface FormValues {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 25px',
  },
  myProfileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 27,
    maxWidth: 980,
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    background: theme.palette.common.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px 20px 30px',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      padding: 20,
      gap: 20,
    },
  },
  headerLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: 24,
    color: theme.palette.common.black,
  },
  headerMiddle: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  bodyContainer: {
    background: theme.palette.common.white,
    padding: 20,
  },
  editButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      gap: 20,
    },
  },
  bodyLeft: {
    width: '57%',
    borderRight: '1px solid black',
    borderColor: theme.palette.grey[300],
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRight: 'none',
    },
  },
  bodyRight: {
    width: '43%',
    paddingLeft: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  fontText: {
    color: theme.palette.common.black,
    fontSize: 14,
  },
  changePasswordButton: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: 400,
    padding: 0,
    textDecoration: 'underline',
    '&:hover': {
      background: 'transparent',
    },
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
}))
const MyProfile = () => {
  const { userData } = useSelector((state: RootState) => state.auth)
  const { classes: styles } = useStyles()
  const navigation = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const { changePassword } = useAuthService()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  })

  const handleEditProfile = () => {
    navigation('/editProfile')
  }
  const onOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true)
  }

  const onChangePassword = handleSubmit((data) => {
    const { oldPassword, newPassword, repeatNewPassword } = data
    if (newPassword !== repeatNewPassword) {
      setModalError('Las contraseñas no coinciden')
      return
    }
    changePassword(oldPassword, newPassword)
    setOpenChangePasswordModal(false)
  })

  return (
    <Box className={styles.container}>
      <FModal
        title='Cambiar contraseña'
        submitButtonTitle='Cambiar contraseña'
        open={openChangePasswordModal}
        saveFullWidth
        onSave={onChangePassword}
        onClose={() => setOpenChangePasswordModal(false)}
      >
        <Box className={styles.modalInputContainer}>
          <FInput
            placeholder='Contraseña actual'
            type='password'
            name='oldPassword'
            control={control}
            error={errors.oldPassword}
          />
          <FInput
            placeholder='Nueva contraseña'
            type='password'
            name='newPassword'
            control={control}
            error={errors.oldPassword}
          />
          <FInput
            placeholder='Repetir nueva contraseña'
            type='password'
            name='repeatNewPassword'
            control={control}
            error={errors.oldPassword}
          />
          {modalError && (
            <Typography sx={{ color: 'red' }}>{modalError}</Typography>
          )}
        </Box>
      </FModal>
      <Box className={styles.myProfileContainer}>
        <Box className={styles.header}>
          <Box className={styles.headerLeft}>
            <Avatar
              src={userData?.photoToShowUrl}
              sx={{ marginRight: 10, width: 60, height: 60 }}
            />
            <Typography className={styles.headerTitle}>
              {userData?.nameToShow}
            </Typography>
            <Tick />
          </Box>
          <Box className={styles.headerMiddle}>
            <Typography className={styles.fontTitle}>
              {t('accountEmail')}
            </Typography>
            <Typography className={styles.fontText}>
              {userData?.userEmail}
            </Typography>
          </Box>
          <Box className={styles.headerRight}>
            <Typography className={styles.fontTitle}>
              {t('password')}
            </Typography>
            <Typography sx={{ color: theme.palette.common.black }}>
              **************
            </Typography>
            <Button
              onClick={onOpenChangePasswordModal}
              className={styles.changePasswordButton}
            >
              Cambiar contraseña
            </Button>
          </Box>
        </Box>
        <Box className={styles.bodyContainer}>
          <Box className={styles.editButtonContainer}>
            <Button
              startIcon={<EditIcon />}
              sx={{ color: '#007AFF' }}
              onClick={handleEditProfile}
            >
              Editar
            </Button>
          </Box>
          <Box className={styles.body}>
            <Box className={styles.bodyLeft}>
              <Box>
                <Typography className={styles.fontTitle}>
                  DATOS PERSONALES
                </Typography>
                <Grid
                  container
                  columnSpacing={60}
                  rowSpacing={25}
                  sx={{ marginTop: 1 }}
                >
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Nombre
                    </Typography>
                    <Typography> {userData?.name}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>DNI</Typography>
                    <Typography> {userData?.dni} </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Apellido
                    </Typography>
                    <Typography> {userData?.surname} </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Fecha de nacimiento
                    </Typography>
                    <Typography>
                      {userData?.birthdate
                        ? formattedDate(userData?.birthdate)
                        : ''}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginTop: 56 }}>
                <Typography className={styles.fontTitle}>
                  CONTACTO Y DOMICILIO
                </Typography>
                <Grid
                  container
                  columnSpacing={60}
                  rowSpacing={25}
                  sx={{ marginTop: 1 }}
                >
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Email de contacto
                    </Typography>
                    <Typography> {userData?.contactEmail}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Telefono de contacto
                    </Typography>
                    <Typography> {userData?.phoneNumber}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Domicilio
                    </Typography>
                    <Typography> {userData?.address}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Ciudad
                    </Typography>
                    <Typography> {userData?.city}</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Provincia
                    </Typography>
                    <Typography> {userData?.state}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={styles.bodyRight}>
              <Typography className={styles.fontTitle}>
                DATOS DE LA CUENTA
              </Typography>
              <Box>
                <Typography className={styles.fontTitleSub}>
                  Nombres para mostrar
                </Typography>
                <Typography> {userData?.nameToShow}</Typography>
              </Box>
              <Box>
                <Typography className={styles.fontTitleSub}>
                  Descripcion
                </Typography>
                <Typography>{userData?.description}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MyProfile
