import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useStyles } from './navbar.styles'
import { Avatar, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import HamburguerIcon from '../../assets/icons/HamburguerIcon'

interface NavbarProps {
  setMenuOpened: (value: boolean) => void
}

const NavBar = ({ setMenuOpened }: NavbarProps) => {
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
          <Avatar className={styles.avatar}>N</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
