import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@mui/material'
import { Product } from '../../../../framework/types'
import TreePointsOption from '../../../../assets/icons/TreePointsOption'
import { capitalizeFirstLetter } from '../../utils/homeParsers'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useDeleteProduct,
  useUpdateProduct,
} from '../../../../framework/api/productApi'
import { useTranslation } from 'react-i18next'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import { makeStyles } from 'tss-react/mui'

interface ProductListMobileCardProps {
  product: Product
  isVerified: boolean
}

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    color: '#757575',
  },
  imageContainer: {
    height: 100,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Oculta cualquier parte de la imagen que sobresalga
    borderRadius: 2,
  },
  image: {
    height: '100%', // Ocupa toda la altura del contenedor
    width: '100%', // Ocupa todo el ancho del contenedor
    objectFit: 'cover', // Llena el contenedor, recortando si es necesario
    objectPosition: 'center', // Centra la imagen dentro del contenedor
  },
}))

const ProductListMobileCard = ({
  product,
  isVerified,
}: ProductListMobileCardProps) => {
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const { updateProductData } = useUpdateProduct()
  const { removeProduct } = useDeleteProduct()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Product
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedProduct(row)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditPublication = () => {
    if (selectedProduct) {
      navigate(`/editPublication/${selectedProduct.id}`)
    }
    handleClose()
  }

  const handleChangeActivate = () => {
    if (selectedProduct) {
      updateProductData({
        ...selectedProduct,
        active: !selectedProduct.active,
      })
    }
    handleClose()
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleRedirectResume = () => {
    if (selectedProduct) {
      navigate(`/resumePage/${selectedProduct.id}`)
    }
    handleClose()
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      removeProduct(selectedProduct.id)
    }
    handleClose()
    setIsDeleteModalOpen(false)
  }

  const renderField = ({ title, text }: any) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontWeight: 700, marginRight: 2 }}>
          {title}:
        </Typography>
        <Typography>{text}</Typography>
      </Box>
    )
  }
  return (
    <Box className={styles.container}>
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        text={t('delete_publication_confirm')}
        showCancelButton={true}
        onSave={handleDeleteProduct}
        submitButtonTitle={t('delete')}
      />
      <Box sx={{ display: 'flex', gap: 8 }}>
        <Box className={styles.imageContainer}>
          <img className={styles.image} src={product.photo1Url} alt='Product' />
        </Box>
        <Box>
          <div>{capitalizeFirstLetter(product.title)}</div>
          {renderField({
            title: 'Estado',
            text: product.active ? 'Activa' : 'Pausada',
          })}
          <div>{renderField({ title: 'Visitas', text: product.visitors })}</div>
          <div>
            {renderField({ title: 'Contactos', text: product.contacts })}
          </div>
        </Box>
      </Box>

      <Box>
        <IconButton onClick={(e) => handleClick(e, product)}>
          <TreePointsOption />
        </IconButton>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEditPublication}>{t('modify')}</MenuItem>
        <MenuItem disabled={!isVerified} onClick={handleChangeActivate}>
          {selectedProduct?.active ? t('pause') : t('activate')}
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>{t('delete')}</MenuItem>
        <MenuItem onClick={handleRedirectResume}>{t('view_summary')}</MenuItem>
      </Menu>
    </Box>
  )
}

export default ProductListMobileCard
