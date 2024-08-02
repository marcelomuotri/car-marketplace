import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  boxContainer: {
    marginTop: 69,
    width: 432,
    height: 371,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    [theme.breakpoints.down('sm')]: {
      width: 314,
      marginTop: 20,
    },
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 400,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
}))
