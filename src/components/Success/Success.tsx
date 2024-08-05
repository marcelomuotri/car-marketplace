import { makeStyles } from 'tss-react/mui'
import { Box, Typography } from '@mui/material'
import FButton from '../FButton/FButton'

const useStyles = makeStyles<{ maxWidth: number }>()((theme, { maxWidth }) => ({
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      gap: 8,
    },
  },
  verifySuccessContainer: {
    maxWidth: maxWidth,
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
    [theme.breakpoints.down('md')]: {
      marginTop: 24,
      marginBottom: 20,
    },
  },
}))

interface VerifySuccessProps {
  Image: React.FC
  title?: string
  subTitle?: string
  buttonTitle?: string
  onClickButton?: () => void
  maxWidth?: number
}

const VerifySuccess = ({
  Image,
  title,
  subTitle,
  buttonTitle,
  onClickButton = () => {},
  maxWidth = 368, // Valor predeterminado
}: VerifySuccessProps) => {
  const { classes: styles } = useStyles({ maxWidth })

  return (
    <Box className={styles.successContainer}>
      <Box className={styles.verifySuccessContainer}>
        {title && <Typography className={styles.title}>{title}</Typography>}
        {subTitle && (
          <Typography className={styles.subTitle}>{subTitle}</Typography>
        )}
        <Image />
      </Box>
      {buttonTitle && (
        <FButton
          className={styles.button}
          title={buttonTitle}
          onClick={onClickButton}
        />
      )}
    </Box>
  )
}

export default VerifySuccess
