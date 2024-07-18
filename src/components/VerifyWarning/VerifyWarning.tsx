import { Box, Typography, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface VerifyWarningProps {
  verifiedStatus: string | undefined
}

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    background: '#FFF177',
    color: '#000',
    padding: '9px 36px',
    position: 'relative',
    top: 0,
    left: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  title: {
    fontWeight: 500,
    fontSize: '14px',
  },
  verifyNow: {
    fontWeight: 700,
    fontSize: '14px',
  },
}))

const VerifyWarning = ({ verifiedStatus }: VerifyWarningProps) => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.container}>
      <Grid container justifyContent='center' alignItems='center' spacing={2}>
        {verifiedStatus === 'unverified' ? (
          <>
            <Grid item xs={12} sm='auto'>
              <Typography className={styles.title}>
                {t('youMustVerifyYoutData')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm='auto'>
              <Link to='/verifyId'>
                <Typography className={styles.verifyNow}>
                  Verificar ahora
                </Typography>
              </Link>
            </Grid>
          </>
        ) : (
          <Typography className={styles.title}>
            {t('weAreVerifyingYourData')}
          </Typography>
        )}
      </Grid>
    </Box>
  )
}

export default VerifyWarning
