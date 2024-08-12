import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    backgroundColor: 'white',
    margin: '20px 50px 0px 20px',
  },
  list: {
    padding: 0,
  },
  list_header: {
    backgroundColor: theme.palette.secondary.main,
  },
  list_header_listItem: {
    alignItems: 'center',
  },
  photoBox: {
    width: '50px',
    height: '50px',
    backgroundColor: 'black',
  },
  columnColor: {
    backgroundColor: 'red',
  },
}))
