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
import { useTranslation } from 'react-i18next'

interface TopBarProps {
  setTitleFilter: (title: string) => void
  setDateFilter: (value: any) => void
  userRejected: boolean
}

const TopBar = ({
  setTitleFilter,
  setDateFilter,
  userRejected,
}: TopBarProps) => {
  console.log(userRejected)
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const onCreatePublication = () => {
    navigate('/createPublication')
  }

  return (
    <Box className={styles.topBar}>
      <Box className={styles.leftBar}>
        <Box className={styles.containerCenter}>
          <Autocomplete
            id='free-solo-demo'
            freeSolo
            options={[]}
            className={styles.searchInput}
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
              />
            )}
          />
        </Box>
        <Box className={styles.containerCenter}>
          <DateRangePicker
            format='dd/MM/yyyy'
            placeholder={t('selectDate')}
            size='lg'
            showHeader={false}
            ranges={[]}
            className={styles.picker}
            onChange={(value) => setDateFilter(value)}
          />
        </Box>
      </Box>
      <Box className={styles.containerCenter}>
        {!userRejected && (
          <FButton
            title={t('newPublication')}
            size='small'
            onClick={onCreatePublication}
            className={styles.createPublicationButton}
          />
        )}
      </Box>
    </Box>
  )
}

export default TopBar
