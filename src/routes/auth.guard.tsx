import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../framework/state/store'
import { Box, CircularProgress } from '@mui/material'
import { useAuthService } from '../framework/state/services/authService'

const AuthGuard = () => {
  const location = useLocation()
  const { user, loading } = useSelector((state: RootState) => state.auth)
  useAuthService()

  const isAuthenticated = !!user

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }
  if (!isAuthenticated) {
    // Redirigir al usuario a la página de login
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default AuthGuard
