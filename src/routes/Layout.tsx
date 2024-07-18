import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'
import { Box, Drawer, Fade, useMediaQuery, useTheme } from '@mui/material'

export default function Layout() {
  const location = useLocation()
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <Box style={{ background: '#F7F7F7', minHeight: '100vh' }}>
      <Navbar setMenuOpened={setMenuOpened} />
      <Box style={{ display: 'flex' }}>
        {!matchesDownSm ? (
          <SideBar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
        ) : (
          <Drawer
            anchor='left'
            open={menuOpened}
            onClose={() => setMenuOpened(false)}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                background: '#fff',
              }}
            >
              <SideBar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
            </Box>
          </Drawer>
        )}
        <Box key={location.pathname} style={{ width: '100%' }}>
          <Fade in={true} timeout={700}>
            <Box>
              <Outlet />
            </Box>
          </Fade>
        </Box>
      </Box>
    </Box>
  )
}
