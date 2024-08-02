import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsById } from '../../framework/api/productApi'
import PublicationResume from './Step3/PublicationResume'
import Loader from '../../components/Loader'
import { makeStyles } from 'tss-react/mui'
import { Box } from '@mui/material'
import { Theme } from '@mui/material/styles'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    maxWidth: 880,
    padding: 25,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}))

const ResumePage = () => {
  const { publicationId } = useParams()
  const { classes: styles } = useStyles()
  const { product, isLoading } = useGetProductsById(publicationId || '')
  if (isLoading) return <Loader />
  return (
    <Box className={styles.container}>
      <Box className={styles.formContainer}>
        <PublicationResume values={product[0]} />
      </Box>
    </Box>
  )
}

export default ResumePage
