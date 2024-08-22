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

const TermsAndConditions = () => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>
        {t('Términos y Condiciones de 2y4 Race')}
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term1' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term2' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term3' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term4' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term5' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term6' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term7' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term8' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term9' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term10' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.title}>{t('privacyPolicy')}</Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term1p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term2p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term3p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term4p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term5p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term6p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term7p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term8p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term9p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term10p' components={{ br: <br /> }} />
      </Typography>
      <Typography className={styles.text}>
        <Trans i18nKey='term11p' components={{ br: <br /> }} />
      </Typography>
    </Box>
  )
}

export default TermsAndConditions
