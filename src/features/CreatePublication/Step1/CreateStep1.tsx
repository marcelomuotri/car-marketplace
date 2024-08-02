import FForm from '../../../components/FForm'
import FInput from '../../../components/FInput'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from 'tss-react/mui'
import UploadImage from '../../../components/UploadImage'

const currencies = [
  { value: '1', label: 'USD' },
  { value: '2', label: 'ARS' },
]

const useStyles = makeStyles()((theme: Theme) => ({
  fontTitleSub: {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
  },
  formTitle: {
    color: '#000',
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  formTitleContainer: {
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      display: 'block',
    },
  },
  gridContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}))

const CreateStep1 = ({
  control,
  errors,
  photo1,
  photo2,
  photo3,
  setPhoto1,
  setPhoto2,
  setPhoto3,
  isDisabled,
}: any) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()

  return (
    <FForm
      title='Detalles y fotos'
      formTitle='Detalles del producto'
      formSubtitle='Define un titulo, descripcion, precio y adjunta una o mas imagenes del producto'
    >
      <Grid
        container
        columnSpacing={25}
        rowSpacing={35}
        className={styles.gridContainer}
      >
        <Grid item md={5}>
          <Typography className={styles.fontTitleSub}>Titulo</Typography>
          <FInput
            type='text'
            name='title'
            error={errors.title}
            control={control}
            rules={{ required: t('requiredField') }}
          />
        </Grid>
        <Grid item md={2}>
          <FInput
            type='select'
            name='currency'
            label='Moneda'
            control={control}
            rules={{ required: t('requiredField') }}
            error={errors.currency}
            options={currencies}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item md={3}>
          <Typography className={styles.fontTitleSub}>Precio</Typography>
          <FInput
            type='number'
            name='price'
            control={control}
            rules={{ required: t('requiredField') }}
            error={errors.price}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item md={2}>
          <FInput
            type='checkbox'
            name='applyPrice'
            label='No aplica'
            control={control}
          />
        </Grid>
        <Grid item md={12}>
          <Typography className={styles.fontTitleSub}>Descripcion</Typography>
          <FInput
            type='text'
            name='description'
            control={control}
            rules={{ required: t('requiredField') }}
            error={errors.description}
            rows={6}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: 150, // Aplicar altura mínima si se especifica
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 35 }}>
        <Grid item md={12} className={styles.formTitleContainer}>
          <Typography className={styles.formTitle}>Fotos</Typography>
          <Typography>
            Subí hasta 3 fotos de tu producto. La primera será la foto
            principal. Es requerido subir al menos una foto
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <UploadImage image={photo1} setImage={setPhoto1} />
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <UploadImage image={photo2} setImage={setPhoto2} />
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <UploadImage image={photo3} setImage={setPhoto3} />
        </Grid>
      </Grid>
    </FForm>
  )
}

export default CreateStep1
