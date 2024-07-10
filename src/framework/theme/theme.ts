import { typographys } from './typography'
import { Breakpoint } from '@mui/material'

export const theme = {
  palette: {
    primary: {
      main: '#6140EC',
      light: '#D8E8EB',
    },
    secondary: {
      main: '#1098AD',
      light: '#D8E8EB',
    },
    text: {
      primary: '#000000',
      secondary: '#074A56',
      input: '#495057',
    },
    action: {
      active: '#0B7285',
      hover: '#FFF',
      disabled: '#CED4DA',
      disabledBorder: '#DEE2E6',
    },
    background: {
      paper: '#F8F9FA',
      default: '#F8F9FA',
    },
    error: {
      main: '#C92A2A',
    },
    success: {
      main: '#51CF66',
    },
    warning: {
      main: '#F08C00',
    },
    info: {
      main: '#1C7ED6',
    },
    common: {
      greyE6: '#ADB5BD',
      black: '#000',
      white: '#FFF',
      transparent: 'transparent',
      grey: '#7D7D7D',
      green: '#009B57',
      orange: '#F05050',
      blue: '#BA650A',
      icons: '#868E96',
    },
    divider: '#DEE2E6',
  },
  breakpoints: {
    keys: ['sm', 'md', 'lg'] as Breakpoint[],
    values: {
      sm: 600,
      md: 900,
      lg: 1200,
    },
  },
  zIndex: {
    header: 99,
  },
  typography: typographys,
  spacing: 1,
}
