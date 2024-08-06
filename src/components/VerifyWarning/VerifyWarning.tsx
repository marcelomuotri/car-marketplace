import { Box, Typography, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { Trans, useTranslation } from 'react-i18next'
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
    marginLeft: '10px',
    fontWeight: 700,
    fontSize: '14px',
    textDecoration: 'underline',
  },
}))

const VerifyWarning = ({ verifiedStatus }: VerifyWarningProps) => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  const renderMessage = () => {
    switch (verifiedStatus) {
      case 'unverified':
        return (
          <>
            <Grid item xs={12} sm='auto'>
              <Typography className={styles.title}>
                {t('youMustVerifyYoutData')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm='auto'>
              <Link to='/verifyId'>
                <Typography className={styles.verifyNow}>
                  {t('verifyNow')}
                </Typography>
              </Link>
            </Grid>
          </>
        )
      case 'pending':
        return (
          <Typography className={styles.title}>
            {t('weAreVerifyingYourData')}
          </Typography>
        )
      case 'rejected':
        return (
          <Grid item xs={12}>
            <Typography className={styles.title}>
              <Trans
                i18nKey='yourDataWasRejected'
                components={[
                  <a
                    href='mailto:hola@dominio'
                    style={{ textDecoration: 'underline' }}
                  >
                    hola@dominio
                  </a>,
                ]}
              />
            </Typography>
          </Grid>
        )
    }
  }

  return (
    <Box className={styles.container}>
      <Grid container justifyContent='center' alignItems='center' spacing={2}>
        {renderMessage()}
      </Grid>
    </Box>
  )
}

export default VerifyWarning
