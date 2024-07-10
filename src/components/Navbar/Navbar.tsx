import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { ArrowDropUp } from '@mui/icons-material'
import { useStyles } from './navbar.styles'
import { Button } from '@mui/material'

const settings = ['Inicio', 'Transacciones', 'Categorias', 'Cerrar sesion']

const NavBar = () => {
  const { classes: styles } = useStyles()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static' className={styles.appbar}>
      <Container>
        <Toolbar className={styles.toolbar}>
          <Box>
            <Typography noWrap component='a' color={'violet'}>
              LOGO
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={handleOpenUserMenu}
              endIcon={<AdbIcon />}
              startIcon={<ArrowDropUp />}
              classes={{
                startIcon: anchorElUser
                  ? `${styles.startIcon} ${styles.rotated} `
                  : styles.startIcon,
                endIcon: styles.endIcon,
              }}
              className={styles.toolbarMenuButton}
            >
              <Typography>
                {/* aca pone el nombre si la sesion esta iniciada sino dice iniciar sesion */}
                Marcelo
              </Typography>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
