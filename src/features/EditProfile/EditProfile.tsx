import FForm from '../../components/FForm'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import FInput from '../../components/FInput'
import { useForm } from 'react-hook-form'
import UploadImage from '../../components/UploadImage'

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

interface FormValues {
  name: string
  dni: string
}

const EditProfile = () => {
  const { classes: styles } = useStyles()
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
      dni: '',
    },
  })
  return (
    <Box className={styles.container}>
      <Box className={styles.editProfileContainer}>
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
                  rowSpacing={25}
                  className={styles.gridContainer}
                >
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Nombre
                    </Typography>
                    <FInput
                      name='name'
                      type='text'
                      control={control}
                      label='Nombre'
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>DNI</Typography>
                    <FInput
                      name='dni'
                      type='text'
                      control={control}
                      label='Nombre'
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
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Fecha de nacimiento
                    </Typography>
                    <FInput
                      name='birthdate'
                      type='text'
                      control={control}
                      label='Fecha de nacimiento'
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Typography className={styles.fontTitle} sx={{ marginTop: 10 }}>
                  CONTACTO Y DOMICILIO
                </Typography>
                <Grid
                  container
                  columnSpacing={25}
                  rowSpacing={25}
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
                      label='1555137056'
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
                      label='Calle falsa 123'
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Ciudad
                    </Typography>
                    <FInput
                      name='city'
                      type='text'
                      control={control}
                      label='Buenos aires'
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Provincia
                    </Typography>
                    <FInput
                      name='state'
                      type='text'
                      control={control}
                      label='Buenos aires'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className={styles.bodyRight}>
              <Box>
                <Typography
                  className={styles.fontTitle}
                  sx={{ marginBottom: 25 }}
                >
                  DATOS DE LA CUENTA
                </Typography>
                <Grid
                  container
                  rowSpacing={25}
                  className={styles.gridContainer}
                >
                  <Grid item md={12}>
                    <Typography className={styles.fontTitleSub}>
                      Nombre para mostrar
                    </Typography>
                    <FInput
                      name='state'
                      type='text'
                      control={control}
                      label='Buenos aires'
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
                      multiline
                      rows={6}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          minHeight: 150, // Aplicar altura mínima si se especifica
                        },
                      }}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <UploadImage
                      title={'Nombre para mostrar'}
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
      </Box>
    </Box>
  )
}

export default EditProfile
