import {
  Box,
  Typography,
  useMediaQuery,
  InputBase,
  OutlinedInput,
  Grid,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FInput from '../../../components/FInput'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    marginLeft: 20,
  },
  formContainer: {
    maxWidth: 880,
    padding: '25px 25px 60px 25px',
    background: '#fff',
  },
}))

const Step1 = () => {
  const { t } = useTranslation()
  const { classes: styles } = useStyles()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  return (
    <Box className={styles.container}>
      <Typography>Datos personales</Typography>
      <Box className={styles.formContainer}>
        <Typography> Confirma tus datos personales</Typography>
        <Typography>
          Completá y confirmá tus datos personales. Asegurate de estén escritos
          correctamente antes de avanzar al siguiente paso.
        </Typography>
        <Grid container spacing={2}>
          //@ts-ignore
          <Grid item xs={12} sm={6}>
            <FInput
              type='text'
              name='text'
              control={control}
              label='Texto'
              placeholder='Ingresa texto'
              error={errors.text}
              rules={{ required: 'Este campo es obligatorio' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FInput
              type='text'
              name='text'
              control={control}
              label='Texto'
              placeholder='Ingresa texto'
              error={errors.text}
              rules={{ required: 'Este campo es obligatorio' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
export default Step1
