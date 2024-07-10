import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: 48,
    ':hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.MuiButton-outlined': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    '&.MuiButton-sizeSmall': {
      paddingLeft: 32,
      paddingRight: 32,
    },
    '&.MuiButton-sizeMedium': {
      paddingLeft: 48,
      paddingRight: 48,
    },
  },
}))
