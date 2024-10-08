import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Product } from '../../../../framework/types'
import {
  useDeleteProduct,
  useUpdateProduct,
} from '../../../../framework/api/productApi'
import Loader from '../../../../components/Loader'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { getCurrencyLabel } from '../../../../framework/utils/currencyConverter'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '../../utils/formatter'

interface ProductsListProps {
  products: Product[]
  isVerified: boolean
}

const ProductList = ({ products, isVerified }: ProductsListProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  const { removeProduct, isDeleting } = useDeleteProduct()
  const { updateProductData, isUpdating } = useUpdateProduct()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: '',
      flex: matchesDownSm ? undefined : 0.5,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            marginLeft: 20,
            height: 60,
            width: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden', // Oculta cualquier parte de la imagen que sobresalga
          }}
        >
          <img
            style={{
              height: '100%', // Ocupa toda la altura del contenedor
              width: '100%', // Ocupa todo el ancho del contenedor
              objectFit: 'cover', // Llena el contenedor, recortando si es necesario
              objectPosition: 'center', // Centra la imagen dentro del contenedor
            }}
            src={params.row.photo1Url || 'defaultImagePath.jpg'}
            alt='Product'
          />
        </Box>
      ),
    },
    {
      field: 'title',
      headerName: t('product'),
      flex: matchesDownSm ? undefined : 1,
      width: matchesDownSm ? 120 : 0,
    },
    {
      field: 'createdAt',
      headerName: t('date'),
      flex: matchesDownSm ? undefined : 0.5,
      valueGetter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'active',
      headerName: t('status'),
      flex: matchesDownSm ? undefined : 0.5,
      valueGetter: (value) => (value ? 'Activa' : 'Pausada'),
    },
    {
      field: 'price',
      headerName: t('price'),
      flex: matchesDownSm ? undefined : 0.5,
      valueGetter: (value, row) => {
        if (!value) return 'N/A'
        const currencyLabel = getCurrencyLabel(row.currency)
        return currencyLabel + ' ' + formatNumber(value)
      },
    },

    {
      field: 'visitors',
      headerName: t('visitors'),
      flex: matchesDownSm ? undefined : 0.5,
    },
    {
      field: 'contacts',
      headerName: t('contacts'),
      flex: matchesDownSm ? undefined : 0.5,
    },
    {
      field: 'options',
      headerName: '',
      flex: matchesDownSm ? undefined : 0.2,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          edge='end'
          aria-label='options'
          onClick={(event) => handleClick(event, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  // Estado y funciones para el menú
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      removeProduct(selectedProduct.id)
    }
    handleClose()
    setIsDeleteModalOpen(false)
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

  const handleEditPublication = () => {
    if (selectedProduct) {
      navigate(`/editPublication/${selectedProduct.id}`)
    }
    handleClose()
  }

  if (isDeleting || isUpdating) {
    return <Loader />
  }

  const handleRedirectResume = () => {
    if (selectedProduct) {
      navigate(`/resumePage/${selectedProduct.id}`)
    }
    handleClose()
  }

  return (
    <Box>
      <ConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        text={t('delete_publication_confirm')}
        showCancelButton={true}
        onSave={handleDeleteProduct}
        submitButtonTitle={t('delete')}
      />
      <DataGrid
        rowHeight={70}
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-row': {
            backgroundColor: 'white',
          },
        }}
        disableColumnMenu={true}
      />
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

export default ProductList
