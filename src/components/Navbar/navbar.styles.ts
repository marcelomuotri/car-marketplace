import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  appbar: {
    background: 'white',
    boxShadow: 'none',
    padding: '8px 30px',
    position: 'sticky',
    top: 0,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  avatar: {
    width: '30px',
    height: '30px',
  },
}))
