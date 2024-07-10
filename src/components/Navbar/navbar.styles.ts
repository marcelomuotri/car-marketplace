import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  appbar: {
    background: 'white',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  toolbarMenuButton: {
    color: theme.palette.common.grey,
    background: 'white',
    padding: '5px 15px',
    borderRadius: '50px',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      background: '#edf0ef',
    },
  },
  startIcon: {
    color: theme.palette.primary.main,
    transition: 'transform 0.5s',
    '& svg': {
      fontSize: '30px!important',
    },
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
  endIcon: {
    color: theme.palette.primary.main,
  },
}))
