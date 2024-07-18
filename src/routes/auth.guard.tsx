import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../framework/state/store'
import { Box } from '@mui/material'
import { useAuthService } from '../framework/state/services/authService'
import Loader from '../components/Loader'

const AuthGuard = () => {
  const location = useLocation()
  const { user, loading } = useSelector((state: RootState) => state.auth)
  useAuthService()

  const isAuthenticated = !!user

  if (loading) {
    return (
      <Box>
        <Loader />
      </Box>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default AuthGuard
