import FForm from '../../../components/FForm'
import FInput from '../../../components/FInput'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from 'tss-react/mui'
import { useEffect } from 'react'
import { useCategoryService } from '../../../framework/state/services/categoryService'
import { reorderOptions } from '../utils/utils'

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

const CreateStep2 = ({ control, errors, watch, selectedCategory }: any) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const { getCategories, data } = useCategoryService()

  const categoryOrder = [
    'Autos',
    'Motos',
    'Karting',
    'ATV',
    'Motores',
    'Partes',
    'Indumentaria',
    'Accesorios',
    'Herramientas',
    'Servicios',
  ]
  //TODO poner RTK para categorias
  useEffect(() => {
    getCategories()
  }, [getCategories])

  const selectedBrand = watch('brand')
  const vehiclesActive = ['autos', 'motos', 'karting', 'atv'].includes(
    selectedCategory?.toLowerCase()
  )

  const piecesActive =
    selectedCategory &&
    [
      'motores',
      'partes',
      'indumentaria',
      'accesorios',
      'herramientas',
    ].includes(selectedCategory?.toLowerCase())
  const serviceActive =
    selectedCategory && selectedCategory?.toLowerCase() === 'servicios'
  const showCondition = selectedCategory!! && !serviceActive // esto se muestra cuando esta activo servicios, y todos los de showpieces
  const showBrandAndModel = selectedCategory!! && vehiclesActive //esto se muestra solo cuando autos, motos y kartings esta activo
  const showEquipment = selectedCategory?.toLowerCase() === 'indumentaria' //activo solo cuando se pone equipamiento
  const showCompetition = piecesActive || showEquipment || serviceActive //activo en estas 3 situaciones

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const categories = categoryOrder.map((cat) => ({
    value: cat.toLowerCase(),
    label: cat,
  }))

  const normalizedCategory =
    selectedCategory?.toLowerCase() === 'atv'
      ? 'ATV'
      : selectedCategory?.toLowerCase()

  const subCategoryOptions = normalizedCategory
    ? data[normalizedCategory]?.subCategories.map((subCat) => ({
        value: subCat,
        label: capitalizeFirstLetter(subCat),
      }))
    : []

  const brandsOptions = showBrandAndModel
    ? reorderOptions(
        Object.keys(data[normalizedCategory]?.brands || {})
          .map((key) => ({
            value: key,
            label: capitalizeFirstLetter(key),
          }))
          .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar alfabéticamente
      )
    : []

  // Ordena las opciones de modelos
  const modelOptions = showBrandAndModel
    ? data[normalizedCategory]?.brands[selectedBrand?.value]
        ?.map((model) => ({
          value: model,
          label: capitalizeFirstLetter(model),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar alfabéticamente
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
        label:
          competition.charAt(0).toUpperCase() +
          competition.slice(1).toLowerCase(),
      }))
    : []

  return (
    <FForm
      title={t('typeOfProductOrService')}
      formTitle={t('categoryAndSubcategory')}
      formSubtitle={t('selectCategoryAndSubcategory')}
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
            placeholder='Seleccionar'
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
              placeholder='Seleccionar'
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
              label='Condición'
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
                placeholder='Seleccionar'
              />
            </Grid>
            <Grid item md={6}>
              <FInput
                type='autocomplete'
                name='model'
                error={errors.model}
                control={control}
                rules={{ required: t('requiredField') }}
                options={modelOptions}
                label='Modelo'
                placeholder='Seleccionar'
              />
            </Grid>
            <Grid item md={6}>
              <FInput
                type='number'
                name='year'
                error={errors.year}
                control={control}
                rules={{
                  required: t('requiredField'),
                  minLength: { value: 4, message: t('fourDigits') },
                  maxLength: { value: 4, message: t('fourDigits') },
                }}
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
                placeholder='Seleccionar'
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
                label='Homologación'
                placeholder='Seleccionar'
              />
            </Grid>
          </>
        )}
        {showCompetition && (
          <Grid item md={12}>
            <Box>
              <Typography className={styles.formTitle}>
                Tipo de competición
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
