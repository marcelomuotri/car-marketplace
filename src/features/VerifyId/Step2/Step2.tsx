import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import FForm from '../../../components/FForm'
import { Trans, useTranslation } from 'react-i18next'
import UploadImage from '../../../components/UploadImage'
import FInput from '../../../components/FInput'
import { useState } from 'react'

interface Step2Props {
  control: any
  errors: any
  setPhotoProfile: (file: File) => void
  setPhotoFrontID: (file: File) => void
  setPhotoBackID: (file: File) => void
  termsAccepted: boolean
  setTermsAccepted: (value: boolean) => void
}

const Step2: React.FC<Step2Props> = ({
  setPhotoProfile,
  setPhotoFrontID, // Asegúrate de que este nombre coincinpmda con el prop en VerifyId
  setPhotoBackID, // Asegúrate de que este nombre coincida con el prop en VerifyId
  termsAccepted,
  setTermsAccepted,
}) => {
  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked)
  }

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
      <Grid container alignItems='center' sx={{ marginTop: 40 }}>
        <Grid item>
          <Checkbox checked={termsAccepted} onChange={handleChange} />
        </Grid>
        <Grid item>
          <Typography>
            <Trans
              i18nKey='acceptTerms'
              components={[
                <a
                  href='/termsAndConditions'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: '#007bff', // Cambia este valor según el color deseado
                    cursor: 'pointer', // Asegura que se muestre la mano al pasar sobre el enlace
                  }}
                >
                  términos, condiciones y políticas de privacidad
                </a>,
              ]}
            />
          </Typography>
        </Grid>
      </Grid>
    </FForm>
  )
}

export default Step2
