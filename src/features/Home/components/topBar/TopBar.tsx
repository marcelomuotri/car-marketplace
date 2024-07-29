import { Autocomplete, Box, TextField } from '@mui/material'
import FButton from '../../../../components/FButton/FButton'
import { useStyles } from './topBar.styles'

const TopBar = () => {
  const { classes: styles } = useStyles()
  return (
    <Box className={styles.topBar}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        options={[]}
        renderInput={() => (
          <TextField variant='outlined' size='small' placeholder='Buscar...' />
        )}
      />
      <FButton title='Crear publicacion' />
    </Box>
  )
}

export default TopBar
