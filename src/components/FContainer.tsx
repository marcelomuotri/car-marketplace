import { Box, Fade } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<{ maxWidth: number }>()((theme, { maxWidth }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: maxWidth,
    padding: 25,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}))

const FContainer = ({ children, maxWidth = 880 }: any) => {
  const { classes: styles } = useStyles({ maxWidth })
  return (
    <Box className={styles.container}>
      <Box className={styles.formContainer}>{children}</Box>
    </Box>
  )
}

export default FContainer
