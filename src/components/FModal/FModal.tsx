import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useStyles } from './fmodal.styles'
import FButton from '../FButton/FButton'

interface FmodalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  submitButtonTitle?: string
  saveFullWidth?: boolean
  onSave: () => void
  showCancelButton?: boolean
  width?: string | number
}

const FModal = ({
  open,
  onClose,
  title,
  children,
  submitButtonTitle = 'Guardar',
  saveFullWidth = false,
  onSave,
  showCancelButton,
  width = 'max-content',
}: FmodalProps) => {
  const { classes: styles } = useStyles({ width })

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <Box className={styles.closeButtonContainer}>
          <IconButton sx={{ padding: 0 }} onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Box>
        {title && (
          <Typography className={styles.modalTitle}>{title}</Typography>
        )}
        {children}
        <Box className={styles.buttonContainer}>
          {showCancelButton && (
            <FButton
              variant='outlined'
              size='small'
              title='cancelar'
              onClick={onClose}
              fullWidth={saveFullWidth}
            />
          )}
          <FButton
            size='small'
            title={submitButtonTitle}
            onClick={onSave}
            fullWidth={saveFullWidth}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default FModal
