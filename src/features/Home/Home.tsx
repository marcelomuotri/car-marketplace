import { Box, Fade, useMediaQuery } from '@mui/material'
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
import { useTheme } from '@mui/material'
import ProductListMobile from './components/ProductListMobile/ProductListMobile'

dayjs.extend(isBetween)

const Home = () => {
  const { classes: styles } = useStyles()
  const theme = useTheme()
  const { userData } = useSelector((state: RootState) => state.auth)
  const [titleFilter, setTitleFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const { products, isLoading } = useGetProductsByUser()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const userRejected = userData?.verifiedStatus === 'rejected'
  const isVerified = userData?.verifiedStatus === 'verified'
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))

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

  if (isLoading || !products) return <Loader />

  return (
    <Box>
      {!isVerified && (
        <Fade in={true} timeout={700}>
          <Box>
            <VerifyWarning verifiedStatus={userData?.verifiedStatus} />
          </Box>
        </Fade>
      )}
      {products?.length > 0 ? (
        <Box className={styles.container}>
          <TopBar
            userRejected={userRejected}
            setTitleFilter={setTitleFilter}
            setDateFilter={setDateFilter}
          />
          <Fade in={true} timeout={1000}>
            <Box>
              {matchesDownSm ? (
                <ProductListMobile
                  products={filteredProducts}
                  isVerified={isVerified}
                />
              ) : (
                <ProductList
                  products={filteredProducts}
                  isVerified={isVerified}
                />
              )}
            </Box>
          </Fade>
        </Box>
      ) : (
        <EmptyProducts userRejected={userRejected} />
      )}
    </Box>
  )
}

export default Home
