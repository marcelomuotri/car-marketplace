import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D9970',
    flex: 1,
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingBottom: 40,
      justifyContent: 'start',
    },
  },
  loginBox: {
    width: '300px',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    padding: '20px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: 'white',
  },
  image: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  emailTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
}))
