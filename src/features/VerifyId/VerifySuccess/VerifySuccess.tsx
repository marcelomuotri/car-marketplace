import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import BoySleeping from '../../../assets/images/BoySleeping'
import FButton from '../../../components/FButton/FButton'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles()((theme: Theme) => ({
  verifySuccessContainer: {
    maxWidth: 368,
    marginTop: 69,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 32,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      marginTop: 20,
    },
  },
  title: {
    fontSize: 22,
    fontWeight: 400,
    color: theme.palette.common.black,
  },
  subTitle: {
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  button: {
    marginTop: 40,
  },
}))

const VerifySuccess = () => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const handleCompleteProfile = () => {}

  return (
    <>
      <Box className={styles.verifySuccessContainer}>
        <Typography className={styles.title}>
          {t('verificationRequestSubmitted')}
        </Typography>
        <Typography className={styles.subTitle}>
          {t('youWillReceiveTheConfirmationSoon')}
        </Typography>
        <BoySleeping />
      </Box>
      <FButton
        className={styles.button}
        title={t('Crear tu primera publicacion')}
        onClick={handleCompleteProfile}
      />
    </>
  )
}

export default VerifySuccess
