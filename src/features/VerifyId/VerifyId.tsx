import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Step1 from './Step1/Step1'

const Step2 = () => {
  return <Typography>Contenido del Paso 2</Typography>
}

const VerifyId = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [<Step1 />, <Step2 />]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box>
      <Box>{steps[activeStep]}</Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant='contained'
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          sx={{ mr: 1 }}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        <Button
          variant='outlined'
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}

export default VerifyId
