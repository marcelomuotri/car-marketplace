import FForm from '../../../components/FForm'
import FInput from '../../../components/FInput'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from 'tss-react/mui'
import { useEffect } from 'react'
import { useCategoryService } from '../../../framework/state/services/categoryService'

const conditions = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Usado', label: 'Usado' },
]

const homologationOptions = [
  { value: true, label: 'SI' },
  { value: false, label: 'NO' },
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

const CreateStep2 = ({ control, errors, watch, setValue }: any) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const { getCategories, data } = useCategoryService()
  useEffect(() => {
    getCategories()
  }, [getCategories])

  // yo tengo 4 layouts distintos, - Los primeros 2 salen siempre, autos motos y kartings
  const selectedCategory: string = watch('category')
  const selectedBrand = watch('brand')
  const vehiclesActive = ['autos', 'motos', 'kartings'].includes(
    selectedCategory
  )
  const piecesActive =
    selectedCategory &&
    [
      'piezas de motor',
      'piezas de unidad',
      'equipamiento',
      'accesorios',
      'herramientas',
    ].includes(selectedCategory)
  const serviceActive = selectedCategory && selectedCategory === 'servicios'
  const showCondition = selectedCategory!! && !serviceActive // esto se muestra cuando esta activo servicios, y todos los de showpieces
  const showBrandAndModel = selectedCategory!! && vehiclesActive //esto se muestra solo cuando autos, motos y kartings esta activo
  const showEquipment = selectedCategory === 'equipamiento' //activo solo cuando se pone equipamiento
  const showCompetition = piecesActive || showEquipment || serviceActive //activo en estas 3 situaciones

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  //let data: { categories: Categories }

  const categories = Object.keys(data).map((category) => ({
    value: category,
    label: capitalizeFirstLetter(category),
  }))

  const subCategoryOptions = selectedCategory
    ? data[selectedCategory]?.subCategories.map((subCat) => ({
        value: subCat,
        label: capitalizeFirstLetter(subCat),
      }))
    : []

  const brandsOptions = showBrandAndModel
    ? Object.keys(data[selectedCategory]?.brands || {}).map((key) => ({
        value: key,
        label: capitalizeFirstLetter(key),
      }))
    : []

  const modelOptions = showBrandAndModel
    ? data[selectedCategory]?.brands[selectedBrand?.value]?.map((model) => ({
        value: model,
        label: capitalizeFirstLetter(model),
      }))
    : []

  const equipmentOptions = showEquipment
    ? data[selectedCategory]?.size?.map((size) => ({
        value: size,
        label: size.toUpperCase(),
      }))
    : []

  const competitionOptions = showCompetition
    ? data[selectedCategory]?.competition?.map((competition) => ({
        value: competition,
        label: competition,
      }))
    : []

  return (
    <FForm
      title='Clasificación del producto o servicio'
      formTitle='Categoría y subcategoría'
      formSubtitle='Selecciona la categoría del producto y la subcategoría a la cual pertenece el producto o servicio'
    >
      <Grid
        container
        columnSpacing={25}
        rowSpacing={35}
        className={styles.gridContainer}
      >
        <Grid item md={6}>
          <FInput
            type='select'
            name='category'
            error={errors.category}
            control={control}
            rules={{ required: t('requiredField') }}
            options={categories}
            label='Categoría'
          />
        </Grid>
        <Grid item md={6}>
          {selectedCategory && (
            <FInput
              type='select'
              name='subCategory'
              error={errors.category}
              control={control}
              rules={{ required: t('requiredField') }}
              options={subCategoryOptions}
              label='Subcategoria'
            />
          )}
        </Grid>
        {showCondition && (
          <Grid item md={12}>
            <FInput
              control={control}
              type='radio'
              name='condition'
              error={errors.condition}
              options={conditions}
              label='Condicion'
              rules={{ required: t('requiredField') }}
            />
          </Grid>
        )}
        {showBrandAndModel && (
          <>
            <Grid item md={6}>
              <FInput
                type='autocomplete'
                name='brand'
                error={errors.category}
                control={control}
                rules={{ required: t('requiredField') }}
                options={brandsOptions}
                label='Marca'
              />
            </Grid>
            <Grid item md={6}>
              <FInput
                type='autocomplete'
                name='model'
                error={errors.model}
                control={control}
                options={modelOptions}
                label='Modelo'
              />
            </Grid>
            <Grid item md={6}>
              <FInput
                type='number'
                name='year'
                error={errors.year}
                control={control}
                rules={{ required: t('requiredField') }}
                label='Año'
              />
            </Grid>
          </>
        )}
        {showEquipment && (
          <>
            <Grid item md={6}>
              <FInput
                type='select'
                name='size'
                error={errors.category}
                control={control}
                rules={{ required: t('requiredField') }}
                options={equipmentOptions}
                label='Talle'
              />
            </Grid>
            <Grid item md={6}>
              <FInput
                type='select'
                name='homologation'
                error={errors.model}
                control={control}
                rules={{ required: t('requiredField') }}
                options={homologationOptions}
                label='Homologacion'
              />
            </Grid>
          </>
        )}
        {showCompetition && (
          <Grid item md={12}>
            <Box>
              <Typography className={styles.formTitle}>
                Tipo de competicion
              </Typography>
              <Typography>
                Elegí todas las competiciones a las que apliquen tu producto o
                servicio.
              </Typography>
            </Box>
            <FInput
              type='checkboxGroup'
              name='competition'
              error={errors.competitions}
              control={control}
              rules={{ required: t('requiredField') }}
              options={competitionOptions}
            />
          </Grid>
        )}
      </Grid>
    </FForm>
  )
}

export default CreateStep2
