import { Modal, Box, Typography } from '@mui/material'
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
}

const FModal = ({
  open,
  onClose,
  title,
  children,
  submitButtonTitle = 'Guardar',
  saveFullWidth = false,
  onSave,
}: FmodalProps) => {
  const { classes: styles } = useStyles()

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <Typography className={styles.modalTitle}>{title}</Typography>
        {children}
        <Box className={styles.buttonContainer}>
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
