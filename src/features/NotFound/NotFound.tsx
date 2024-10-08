import boyfishing from '../../assets/images/boyFishing.png'
import { Box, Typography, Fade } from '@mui/material'
import FButton from '../../components/FButton/FButton'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Fade in={true} timeout={800}>
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
    </Fade>
  )
}

export default NotFound
