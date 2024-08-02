import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
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

interface ProductsListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductsListProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { removeProduct, isDeleting } = useDeleteProduct()
  const { updateProductData, isUpdating } = useUpdateProduct()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: '',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          component='img'
          sx={{
            paddingLeft: 36,
            width: 70,
            height: 50,
          }}
          src={params.row.photo1Url || 'defaultImagePath.jpg'}
          alt='Product'
        />
      ),
    },
    { field: 'title', headerName: t('product'), width: 200 },
    {
      field: 'createdAt',
      headerName: t('date'),
      width: 150,
      valueGetter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'active',
      headerName: t('status'),
      width: 150,
      valueGetter: (value) => (value ? 'Activa' : 'Pausada'),
    },
    {
      field: 'price',
      headerName: t('price'),
      width: 150,
      valueGetter: (value, row) => {
        if (!value) return 'N/A'
        const currencyLabel = getCurrencyLabel(row.currency)
        return currencyLabel + ' ' + value
      },
    },

    { field: 'visitors', headerName: t('visitors'), width: 120 },
    { field: 'contacts', headerName: t('contacts'), width: 120 },
    {
      field: 'options',
      headerName: '',
      width: 50,
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
        title={t('delete_publication')}
        text={t('delete_publication_confirm')}
        showCancelButton={true}
        onSave={handleDeleteProduct}
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
        <MenuItem onClick={handleChangeActivate}>
          {selectedProduct?.active ? t('pause') : t('activate')}
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>{t('delete')}</MenuItem>
        <MenuItem onClick={handleRedirectResume}>{t('view_summary')}</MenuItem>
      </Menu>
    </Box>
  )
}

export default ProductList
