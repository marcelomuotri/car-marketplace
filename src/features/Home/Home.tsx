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

const Home = () => {
  //const { classes: styles } = useStyles()
  const { userData } = useSelector((state: RootState) => state.auth)

  const [products, setProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastVisible, setLastVisible] = useState(null)
  const productsPerPage = 5
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products')

      let productsQuery = query(
        productsCollection,
        orderBy('startingDate', 'desc'),
        limit(productsPerPage)
      )

      if (currentPage > 1) {
        const startIndex = (currentPage - 1) * productsPerPage
        const startAfterDoc = products[startIndex - 1]

        productsQuery = query(
          productsCollection,
          orderBy('startingDate', 'desc'),
          startAfter(startAfterDoc),
          limit(productsPerPage)
        )
      }

      const productsSnapshot = await getDocs(productsQuery)

      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setProducts(productsData)

      if (productsSnapshot.docs.length > 0) {
        setLastVisible(productsSnapshot.docs[productsSnapshot.docs.length - 1])
      } else {
        setLastVisible(null)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const goToNextPage = () => {
    if (lastVisible) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    fetchProducts()
    //setLoading(false)
  }, [currentPage])

  return (
    <Box>
      {loading && <Loader />}
      {userData?.verifiedStatus !== 'verified' && (
        <Fade in={true} timeout={700}>
          <Box>
            <VerifyWarning verifiedStatus={userData?.verifiedStatus} />
          </Box>
        </Fade>
      )}
      {products.length > 0 && <EmptyProducts />}
      {/* <FButton title='cerrar sesion' onClick={onCloseSession()} /> */}
      {/* <TopBar />
      <ProductList products={products} />
      <Button onClick={goToPreviousPage}>Previous</Button>
      <Button onClick={goToNextPage}>Next</Button> */}
    </Box>
  )
}

export default Home
