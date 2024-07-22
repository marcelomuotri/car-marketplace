import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    background: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    paddingBottom: 10,
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.main,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
