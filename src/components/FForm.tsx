import { Box, Theme, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 16,
    marginTop: 123,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  formContainer: {
    padding: '25px 25px 60px 25px',
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      padding: 26,
    },
  },
  formTitle: {
    color: '#000',
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  formTitleContainer: {
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      display: 'block',
    },
  },
}))

interface FFormProps {
  children: React.ReactNode
  title: string
  formTitle: string
  formSubtitle: string
}

const FForm = ({ children, title, formTitle, formSubtitle }: FFormProps) => {
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>{title}</Typography>
      <Box className={styles.formContainer}>
        <Box className={styles.formTitleContainer}>
          <Typography className={styles.formTitle}>{formTitle}</Typography>
          <Typography>{formSubtitle}</Typography>
        </Box>
        {children}
      </Box>
    </Box>
  )
}

export default FForm
