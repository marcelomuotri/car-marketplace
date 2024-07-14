import { Box } from '@mui/material'

const TopBar = () => {
  return (
    <Box className='top-bar'>
      <input type='text' />
      <input type='range' />
      <button>Submit</button>
    </Box>
  )
}

export default TopBar
