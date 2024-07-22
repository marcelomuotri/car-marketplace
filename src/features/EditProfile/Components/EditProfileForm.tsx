import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import FForm from '../../../components/FForm'
import FInput from '../../../components/FInput'
import UploadImage from '../../../components/UploadImage'
import { provinces } from '../../../framework/constants/provinces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../framework/state/store'

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

const EditProfileForm = ({
  control,
  errors,
  setPhotoToShow,
  photoToShowUrl,
}: any) => {
  const { classes: styles } = useStyles()
  const { userData } = useSelector((state: RootState) => state.auth)

  return (
    <FForm
      title='Datos de perfil'
      formTitle='Confirma los datos de tu perfil'
      formSubtitle='Completá y confirmá los siguientes datos. Solo se publicarán los datos de la cuenta, como el nombre para mostrar, la descripción, los datos de contacto y tu ciudad. No publicaremos tus datos personales.'
    >
      <Box className={styles.body}>
        <Box className={styles.bodyLeft}>
          <Box>
            <Typography className={styles.fontTitle}>
              DATOS PERSONALES
            </Typography>
            <Grid
              container
              columnSpacing={25}
              rowSpacing={13}
              className={styles.gridContainer}
            >
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>Nombre</Typography>
                <FInput
                  name='name'
                  type='text'
                  control={control}
                  label='Nombre'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.name}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>DNI</Typography>
                <FInput
                  name='dni'
                  type='number'
                  control={control}
                  label='35387654'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.dni}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Apellido
                </Typography>
                <FInput
                  name='surname'
                  type='text'
                  control={control}
                  label='Apellido'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.surname}
                  disabled={
                    userData?.verifiedStatus === 'verified' ||
                    userData?.verifiedStatus === 'pending'
                  }
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Fecha de nacimiento
                </Typography>
                <FInput
                  name='birthdate'
                  type='date'
                  control={control}
                  label='Fecha de nacimiento'
                  rules={{ required: 'Este campo es obligatorio' }}
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
              CONTACTO Y DOMICILIO
            </Typography>
            <Grid
              container
              columnSpacing={25}
              rowSpacing={13}
              className={styles.gridContainer}
            >
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Email de contacto
                </Typography>
                <FInput
                  name='contactEmail'
                  type='text'
                  control={control}
                  label='email@email.com'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.contactEmail}
                  validationType='email'
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Telefono de contacto
                </Typography>
                <FInput
                  name='phoneNumber'
                  type='text'
                  control={control}
                  label='1345223344'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.phoneNumber}
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Domicilio
                </Typography>
                <FInput
                  name='address'
                  type='text'
                  control={control}
                  label='Alberdi 897'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.address}
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>Ciudad</Typography>
                <FInput
                  name='city'
                  type='text'
                  control={control}
                  label='Buenos aires'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.city}
                />
              </Grid>
              <Grid item md={6}>
                <Typography className={styles.fontTitleSub}>
                  Provincia
                </Typography>
                <FInput
                  name='state'
                  type='select'
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.state}
                  options={provinces}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={styles.bodyRight}>
          <Box>
            <Typography className={styles.fontTitle}>
              DATOS DE LA CUENTA
            </Typography>
            <Grid container rowSpacing={13} className={styles.gridContainer}>
              <Grid item md={12}>
                <Typography className={styles.fontTitleSub}>
                  Nombre para mostrar
                </Typography>
                <FInput
                  name='nameToShow'
                  type='text'
                  control={control}
                  label='Buenos aires'
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.nameToShow}
                />
              </Grid>
              <Grid item md={12}>
                <Typography className={styles.fontTitleSub}>
                  Descripcion
                </Typography>
                <FInput
                  name='description'
                  type='text'
                  control={control}
                  label=' '
                  rows={6}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      minHeight: 150, // Aplicar altura mínima si se especifica
                    },
                  }}
                  rules={{ required: 'Este campo es obligatorio' }}
                  error={errors.description}
                />
              </Grid>
              <Grid item md={12}>
                <UploadImage
                  image={photoToShowUrl}
                  setImage={setPhotoToShow}
                  title={'Foto para mostrar'}
                  subTitle={
                    'Adjuntá una foto de tu marca, tu comercio o tu perfil para que los usuarios te conozcan.'
                  }
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
