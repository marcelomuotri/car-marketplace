import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useStyles } from './navbar.styles'
import { Avatar, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import HamburguerIcon from '../../assets/icons/HamburguerIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'

interface NavbarProps {
  setMenuOpened: (value: boolean) => void
}

const NavBar = ({ setMenuOpened }: NavbarProps) => {
  const { userData } = useSelector((state: RootState) => state.auth)

  const { classes: styles } = useStyles()
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  const onToggleMenu = () => {
    setMenuOpened(true)
  }

  return (
    <AppBar className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        {matchesDownSm ? (
          <IconButton onClick={onToggleMenu}>
            <HamburguerIcon />
          </IconButton>
        ) : (
          <Typography noWrap component='a' color={'violet'}>
            LOGO
          </Typography>
        )}
        <Box>
          <Avatar
            src={userData?.photoToShowUrl}
            sx={{
              marginRight: 10,
              width: 40,
              height: 40,
              objectFit: 'cover',
              imageRendering: 'auto',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
