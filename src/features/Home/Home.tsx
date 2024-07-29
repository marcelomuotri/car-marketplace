//import { useStyles } from './home.styles'
//import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { Box, Fade } from '@mui/material'
//import { useStyles } from './home.styles'
import Loader from '../../components/Loader'
import EmptyProducts from './components/EmptyProducts/EmptyProducts'
import VerifyWarning from '../../components/VerifyWarning/VerifyWarning'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import TopBar from './components/topBar/TopBar'
import ProductList from './components/ProductsList/ProductList'
import { useProductService } from '../../framework/state/services/productService'

const Home = () => {
  //const { classes: styles } = useStyles()
  const { userData } = useSelector((state: RootState) => state.auth)

  const { data: products, loading, getProducts } = useProductService()

  useEffect(() => {
    getProducts()
  }, [])

  if (loading) return <Loader />

  console.log(userData?.uid)
  console.log(products)
  return (
    <Box>
      {userData?.verifiedStatus !== 'verified' && (
        <Fade in={true} timeout={700}>
          <Box>
            <VerifyWarning verifiedStatus={userData?.verifiedStatus} />
          </Box>
        </Fade>
      )}
      <EmptyProducts />

      {/* <Button onClick={goToPreviousPage}>Previous</Button>
      <Button onClick={goToNextPage}>Next</Button> */}
    </Box>
  )
}

export default Home
