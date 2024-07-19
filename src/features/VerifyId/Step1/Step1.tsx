import { Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import FInput from '../../../components/FInput'
import FForm from '../../../components/FForm'

const useStyles = makeStyles()((theme: Theme) => ({
  gridContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}))

const Step1 = ({ control, errors }: any) => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()

  return (
    <FForm
      title={t('personalData')}
      formTitle={t('Confirma tus datos personales')}
      formSubtitle={t('completeAndConfirm')}
    >
      <Grid
        container
        columnSpacing={56}
        rowSpacing={26}
        className={styles.gridContainer}
      >
        <Grid item xs={12} sm={6}>
          <FInput
            type='text'
            name='name'
            control={control}
            placeholder='Nombre'
            error={errors.name}
            rules={{ required: 'Este campo es obligatorio' }}
            label={'Carlos'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FInput
            type='text'
            name='surname'
            control={control}
            placeholder='Apellido'
            error={errors.surname}
            rules={{ required: 'Este campo es obligatorio' }}
            label={'Perez'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FInput
            type='number'
            name='dni'
            control={control}
            placeholder='DNI'
            error={errors.dni}
            rules={{ required: 'Este campo es obligatorio' }}
            label={'20123444'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FInput
            type='date'
            name='birthDate'
            control={control}
            placeholder='Fecha de nacimiento'
            error={errors.birthDate}
            rules={{ required: 'Este campo es obligatorio' }}
            label={'Perez'}
          />
        </Grid>
      </Grid>
    </FForm>
  )
}

export default Step1
