import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  leftBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  searchInput: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      width: '80%',
    },
  },
  picker: {
    width: 250,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      width: '80%',
    },
  },
  containerCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  createPublicationButton: {
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}))
