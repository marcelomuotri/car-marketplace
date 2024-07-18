import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: 880,
    padding: 25,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: 32,
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}))
