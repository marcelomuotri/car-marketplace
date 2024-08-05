import { Grid } from '@mui/material'
import FForm from '../../../components/FForm'
import { useTranslation } from 'react-i18next'
import UploadImage from '../../../components/UploadImage'

interface Step2Props {
  control: any
  errors: any
  setPhotoProfile: (file: File) => void
  setPhotoFrontID: (file: File) => void
  setPhotoBackID: (file: File) => void
}

const Step2: React.FC<Step2Props> = ({
  setPhotoProfile,
  setPhotoFrontID, // Asegúrate de que este nombre coincida con el prop en VerifyId
  setPhotoBackID, // Asegúrate de que este nombre coincida con el prop en VerifyId
}) => {
  const { t } = useTranslation()

  return (
    <FForm
      title={t('docuementAndSelfie')}
      formTitle={t('documentAndPhotoSelfie')}
      formSubtitle={t('toCompleteVerifyProcess')}
    >
      <Grid container columnSpacing={118} rowSpacing={56}>
        <Grid item xs={12} sm={6}>
          <UploadImage title={t('DNIFront')} setImage={setPhotoFrontID} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadImage title={t('DNIPhotoBack')} setImage={setPhotoBackID} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadImage
            title={t('SelfiePhoto')}
            subTitle={t('makeSureYourFace')}
            setImage={setPhotoProfile}
            subtitleStyles={{ textWrap: 'nowrap' }}
          />
        </Grid>
      </Grid>
    </FForm>
  )
}

export default Step2
