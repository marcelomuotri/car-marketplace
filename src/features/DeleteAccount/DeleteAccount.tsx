import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useTranslation, Trans } from 'react-i18next'

const useStyles = makeStyles()(() => ({
  container: {
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  text: {
    color: 'grey',
  },
}))

const DeleteAccount = () => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>
        ¿Cómo puedo eliminar mi cuenta?
      </Typography>
      <Typography className={styles.text}>
        Si deseas eliminar tu cuenta en nuestra aplicación, sigue los siguientes
        pasos: Envía un correo electrónico a proyecto.competicion@gmail.com
        solicitando la eliminación de tu cuenta. En el correo, por favor incluye
        la siguiente información: Tu nombre completo. La dirección de correo
        electrónico asociada con tu cuenta. El motivo por el cual deseas
        eliminar tu cuenta (opcional). Nuestro equipo confirmará la recepción de
        tu solicitud y procederá con la eliminación de tu cuenta en un plazo de
        [especifica un tiempo, por ejemplo, "7 días hábiles"].
      </Typography>
      <Typography className={styles.title}>
        ¿Qué sucede con mis datos personales?
      </Typography>
      <Typography className={styles.text}>
        Al solicitar la eliminación de tu cuenta, también se eliminarán todos
        tus datos personales asociados con ella. Esto incluye, pero no se limita
        a: Información de perfil (nombre, correo electrónico, etc.). Historial
        de compras y transacciones. Preferencias de usuario y configuraciones
        guardadas. Una vez que tu cuenta y datos personales hayan sido
        eliminados, ya no podrán ser recuperados.
      </Typography>
      <Typography className={styles.title}>
        ¿Cómo protegemos tu privacidad?
      </Typography>
      <Typography className={styles.text}>
        Nos tomamos muy en serio la privacidad de nuestros usuarios. Toda la
        información personal que recolectamos es utilizada exclusivamente para
        mejorar tu experiencia en nuestra aplicación y nunca será compartida con
        terceros sin tu consentimiento explícito.
      </Typography>
    </Box>
  )
}

export default DeleteAccount
