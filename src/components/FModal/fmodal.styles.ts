import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles<{ width: number | string }>()(
  (theme: Theme, { width }) => ({
    modalContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '12px 20px 20px 20px',
      borderRadius: theme.shape.borderRadius,
      width: width,
    },
    modalTitle: {
      paddingBottom: 10,
    },
    buttonContainer: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'space-around',
    },
    closeButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 12,
    },
  })
)
