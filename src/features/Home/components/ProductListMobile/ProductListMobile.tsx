import { Box } from '@mui/material'
import { Product } from '../../../../framework/types'
import ProductListMobileCard from '../ProductListMobileCard/ProductListMobileCard'

interface ProductListMobileProps {
  products: Product[]
  isVerified: boolean
}

const ProductListMobile = ({
  products,
  isVerified,
}: ProductListMobileProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        marginRight: 30,
        marginLeft: 30,
        borderRadius: '8px',
      }}
    >
      {products?.map((product) => (
        <Box
          key={product.id} // Asegúrate de que el producto tenga un ID único
        >
          <ProductListMobileCard product={product} isVerified={isVerified} />
        </Box>
      ))}
    </Box>
  )
}

export default ProductListMobile
