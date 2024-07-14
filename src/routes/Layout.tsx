import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import SideBar from '../components/SideBar/SideBar'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import VerifyWarning from '../components/VerifyWarning/VerifyWarning'

export default function Layout() {
  const location = useLocation()
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuOpened, setMenuOpened] = useState(false)
  return (
    <>
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
            <Box sx={{ display: 'flex', width: '100%', background: '#fff' }}>
              <SideBar menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
            </Box>
          </Drawer>
        )}
        <Box
          key={location.pathname}
          style={{ background: '#F7F7F7', width: '100%' }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
