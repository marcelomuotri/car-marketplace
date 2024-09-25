import boyfishing from '../../assets/images/boyFishing.png'
import { Box, Typography } from '@mui/material'
import FButton from '../../components/FButton/FButton'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
      }}
    >
      <Typography style={{ textAlign: 'center', fontSize: 22 }}>
        Algo salió mal
      </Typography>
      <img src={boyfishing} style={{ width: 300, marginTop: -10 }} />
      <FButton title='Volver' onClick={() => navigate('home')} />
    </Box>
  )
}

export default NotFound
