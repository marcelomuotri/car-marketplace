import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { ProductUpload } from '../../../framework/types'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileContainer: {
    padding: '25px 25px 50px 25px',
    backgroundColor: theme.palette.common.white,
    maxWidth: 880,
    minWidth: 830,
    [theme.breakpoints.down('md')]: {
      minWidth: 0,
      width: '90%',
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 16,
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  fieldTitle: {
    fontWeight: 500,
    color: '#000',
    marginRight: 5,
  },
  fieldTitle2: {
    fontWeight: 600,
    color: '#000',
    marginRight: 5,
    marginTop: 32,
  },
  field: {
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  atributesGrid: {
    marginTop: 22,
    marginBottom: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  imageContainer: {
    width: 178,
    height: 105,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[300],
  },
  image: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },
}))

const PublicationResume = ({
  values,
  photo1,
  photo2,
  photo3,
}: {
  values: ProductUpload
  photo1?: File | null
  photo2?: File | null
  photo3?: File | null
}) => {
  const { classes: styles } = useStyles()
  const {
    title,
    currency,
    price,
    description,
    applyPrice,
    category,
    subCategory,
    condition,
    brand,
    model,
    year,
    size,
    homologation,
    competition,
  } = values

  const titleFields = [
    { label: 'Título', value: title },
    { label: 'Precio', value: !applyPrice ? price : null },
    { label: 'Descripción', value: description },
  ]

  const fields = [
    { label: 'Condición', value: condition },
    { label: 'Marca', value: brand?.value },
    { label: 'Modelo', value: model?.value },
    { label: 'Año', value: year },
    { label: 'Talle', value: size },
    {
      label: 'Homologación',
      value:
        typeof homologation === 'boolean' ? (homologation ? 'Sí' : 'No') : null,
    },
    {
      label: 'Competencia',
      value:
        competition && competition?.length > 0 ? competition?.join(', ') : null,
    },
    { label: 'Moneda', value: currency === '1' ? 'USD' : 'ARS' },
  ]

  const images = [
    { label: 'Foto 1', file: photo1, url: values.photo1Url },
    { label: 'Foto 2', file: photo2, url: values.photo2Url },
    { label: 'Foto 3', file: photo3, url: values.photo3Url },
  ]

  return (
    <Box className={styles.container}>
      <Box sx={{ display: 'flex', alignSelf: 'start' }}>
        <Typography className={styles.title}>Resumen</Typography>
      </Box>
      <Box className={styles.editProfileContainer}>
        {titleFields.map(
          (field, index) =>
            field.value && (
              <Box key={index} className={styles.field}>
                <Typography className={styles.fieldTitle}>
                  {field.label}:
                </Typography>
                <Typography>{field.value}</Typography>
              </Box>
            )
        )}
        <Typography className={styles.fieldTitle2}>Clasificacion</Typography>
        <Typography
          className={styles.fieldTitle}
        >{`${category} > ${subCategory}`}</Typography>
        <Grid
          container
          className={styles.atributesGrid}
          sx={{ marginTop: 22, marginBottom: 32 }}
        >
          {fields.map(
            (field, index) =>
              field.value && (
                <Grid item md={4} key={index} className={styles.field}>
                  <Typography className={styles.fieldTitle}>
                    {field.label}:
                  </Typography>
                  <Typography>{field.value}</Typography>
                </Grid>
              )
          )}
        </Grid>
        <Grid container>
          {images.map(
            (image, index) =>
              (image.file || image.url) && (
                <Grid
                  item
                  md={4}
                  key={index}
                  className={styles.item}
                  sx={{ width: 178, height: 105 }}
                >
                  <Typography className={styles.fieldTitle}>
                    {image.label}:
                  </Typography>
                  <Box className={styles.imageContainer}>
                    <Box
                      component='img'
                      src={
                        image.file
                          ? URL.createObjectURL(image.file)
                          : image.url || ''
                      }
                      alt={image.label}
                      className={styles.image}
                      sx={{ height: 105 }}
                    />
                  </Box>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default PublicationResume
