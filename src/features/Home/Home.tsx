import React from 'react'
import { useStyles } from './home.styles'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FButton from '../../components/FButton/FButton'
import { useAuthService } from '../../framework/state/services/authService'

const Home = () => {
  const { classes: styles } = useStyles()
  const { logoutUser } = useAuthService()

  const navigate = useNavigate()

  const onCloseSession = () => () => {
    logoutUser()
    navigate('/login')
  }

  // if (isLoading)
  //   return (
  //     <Box className={styles.circularContainer}>
  //       <CircularProgress />
  //     </Box>
  //   )

  return <FButton title='cerrar sesion' onClick={onCloseSession()} />
}

export default Home
