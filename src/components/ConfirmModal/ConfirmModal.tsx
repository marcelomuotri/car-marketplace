import FModal from '../FModal/FModal'
import { Typography } from '@mui/material'

const ConfirmModal = ({
  open,
  onClose,
  onSave,
  title,
  text,
  showCancelButton,
}: any) => {
  return (
    <FModal
      open={open}
      onClose={onClose}
      title={title}
      onSave={onSave}
      showCancelButton={showCancelButton}
    >
      <Typography>{text}</Typography>
    </FModal>
  )
}

export default ConfirmModal
