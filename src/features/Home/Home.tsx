import { Box, Fade } from '@mui/material'
import { useStyles } from './home.styles'
import Loader from '../../components/Loader'
import EmptyProducts from './components/EmptyProducts/EmptyProducts'
import VerifyWarning from '../../components/VerifyWarning/VerifyWarning'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import TopBar from './components/topBar/TopBar'
import ProductList from './components/ProductsList/ProductList'
import { useGetProductsByUser } from '../../framework/api/productApi'
import { useEffect, useState } from 'react'
import { Product } from '../../framework/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const Home = () => {
  const { classes: styles } = useStyles()
  const { userData } = useSelector((state: RootState) => state.auth)
  const [titleFilter, setTitleFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const { products, isLoading } = useGetProductsByUser()
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let updatedProducts = products

    if (titleFilter && updatedProducts) {
      updatedProducts = updatedProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    }

    if (dateFilter && dateFilter.length === 2 && updatedProducts) {
      const startDate = dayjs(dateFilter[0])
      const endDate = dayjs(dateFilter[1]).add(1, 'day').startOf('day')

      updatedProducts = updatedProducts.filter((product: Product) => {
        const productDate = dayjs(product.createdAt)
        return productDate.isBetween(startDate, endDate, null, '[]')
      })
    }

    setFilteredProducts(updatedProducts)
  }, [titleFilter, dateFilter, products])

  if (isLoading) return <Loader />

  return (
    <Box>
      {userData?.verifiedStatus !== 'verified' && (
        <Fade in={true} timeout={700}>
          <Box>
            <VerifyWarning verifiedStatus={userData?.verifiedStatus} />
          </Box>
        </Fade>
      )}
      {products ? (
        <Box className={styles.container}>
          <TopBar
            setTitleFilter={setTitleFilter}
            setDateFilter={setDateFilter}
          />
          <ProductList products={filteredProducts} />
        </Box>
      ) : (
        <EmptyProducts />
      )}
    </Box>
  )
}

export default Home
