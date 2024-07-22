import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  sideBarContainer: {
    position: 'sticky',
    top: 50,
    height: '93.5vh',
    width: '230px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    },
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  arrow: {
    color: theme.palette.text.primary,
    alignSelf: 'flex-end',
  },
  itemButton: {
    backgroundColor: theme.palette.background.paper,
  },
  optionText: {
    color: 'theme.palette.text.primary',
  },
  listItemButton: {
    width: 180,
    margin: '0px 25px',
    '& .MuiListItemIcon-root': {
      minWidth: '0px',
      marginRight: '8px',
    },
  },
  itemBottom: {
    marginRight: 0,
    paddingRight: 0,
  },
}))
