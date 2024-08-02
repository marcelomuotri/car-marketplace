import {
  Autocomplete,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'
import FButton from '../../../../components/FButton/FButton'
import { useStyles } from './topBar.styles'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '../../../../assets/icons/SearchIcon'
import { DateRangePicker } from 'rsuite'

interface TopBarProps {
  setTitleFilter: (title: string) => void
  setDateFilter: (value: any) => void
}

const TopBar = ({ setTitleFilter, setDateFilter }: TopBarProps) => {
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const onCreatePublication = () => {
    navigate('/createPublication')
  }

  return (
    <Box className={styles.topBar}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            onChange={(e) => setTitleFilter(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' sx={{ marginRight: 5 }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
              backgroundColor: 'white',
            }}
          />
        )}
      />
      <DateRangePicker
        format='dd/MM/yyyy'
        placeholder='Seleccionar fecha'
        size='lg'
        showHeader={false}
        ranges={[]}
        style={{
          width: 250,
        }}
        onChange={(value) => setDateFilter(value)}
      />
      <FButton
        title='Nueva publicacion'
        size='small'
        onClick={onCreatePublication}
      />
    </Box>
  )
}

export default TopBar
