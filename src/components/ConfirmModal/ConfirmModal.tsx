import FModal from '../FModal/FModal'
import { Typography } from '@mui/material'

const ConfirmModal = ({
  open,
  onClose,
  onSave,
  title,
  text,
  showCancelButton,
  submitButtonTitle,
}: any) => {
  return (
    <FModal
      open={open}
      onClose={onClose}
      title={title}
      onSave={onSave}
      showCancelButton={showCancelButton}
      submitButtonTitle={submitButtonTitle}
    >
      <Typography>{text}</Typography>
    </FModal>
  )
}

export default ConfirmModal
