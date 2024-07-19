import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import Tick from '../../assets/icons/Tick'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EditIcon from '../../assets/icons/EditIcon'
import { useNavigate } from 'react-router-dom'

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
}))
const MyProfile = () => {
  const { classes: styles } = useStyles()
  const navigation = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()
  const handleEditProfile = () => {
    navigation('/editProfile')
  }
  return (
    <Box className={styles.container}>
      <Box className={styles.myProfileContainer}>
        <Box className={styles.header}>
          <Box className={styles.headerLeft}>
            <Avatar sx={{ marginRight: 10, width: 60, height: 60 }} />
            <Typography className={styles.headerTitle}>
              Escapes Claudio
            </Typography>
            <Tick />
          </Box>
          <Box className={styles.headerMiddle}>
            <Typography className={styles.fontTitle}>
              {t('accountEmail')}
            </Typography>
            <Typography className={styles.fontText}>
              hola@cositas.com
            </Typography>
          </Box>
          <Box className={styles.headerRight}>
            <Typography className={styles.fontTitle}>
              {t('password')}
            </Typography>
            <Typography sx={{ color: theme.palette.common.black }}>
              **************
            </Typography>
            <Link to='/changePassword'>Cambiar contraseña</Link>
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
                    <Typography> Carlos Roberto</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>DNI</Typography>
                    <Typography> 35375904</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Apellido
                    </Typography>
                    <Typography> Fernandez Fort</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Fecha de nacimiento
                    </Typography>
                    <Typography> 20/06/1990</Typography>
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
                    <Typography> carlos@roberto.com.ar</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Telefono de contacto
                    </Typography>
                    <Typography> +34 33145454</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Domicilio
                    </Typography>
                    <Typography> Santa Maria de oro 1234</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Ciudad
                    </Typography>
                    <Typography> Ituzaingo</Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography className={styles.fontTitleSub}>
                      Provincia
                    </Typography>
                    <Typography> Buenos Aires</Typography>
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
                <Typography> Escapes claudio</Typography>
              </Box>
              <Box>
                <Typography className={styles.fontTitleSub}>
                  Descripcion
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MyProfile
