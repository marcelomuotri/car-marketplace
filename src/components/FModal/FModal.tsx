import { Modal, Box, Typography } from '@mui/material'
import { useStyles } from './fmodal.styles'

interface FmodalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const FModal = ({ open, onClose, title, children }: FmodalProps) => {
  const { classes: styles } = useStyles()

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <Typography className={styles.modalTitle}>{title}</Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default FModal
