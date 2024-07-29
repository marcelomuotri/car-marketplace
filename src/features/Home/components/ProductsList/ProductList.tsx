import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useStyles } from './productList.styles'
import { Product } from '../../../../framework/types'

interface ProductsListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductsListProps) => {
  const { classes: styles } = useStyles()
  console.log(products)

  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            height: '50px',
            backgroundColor: 'black',
            width: '100%',
          }}
        />
      ),
    },
    { field: 'title', headerName: 'Producto', width: 200 },
    { field: 'createdAt', headerName: 'Fecha', width: 150 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 150,
      valueGetter: () => 'Activo',
    },
    { field: 'price', headerName: 'Precio', width: 150 },
    { field: 'visitors', headerName: 'Visitas', width: 150 },
    { field: 'contacts', headerName: 'Contactos', width: 150 },
    {
      field: 'options',
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton edge='end' aria-label='options' onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  // Estado y funciones para el menú
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={styles.container} style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Opción 1</MenuItem>
        <MenuItem onClick={handleClose}>Opción 2</MenuItem>
      </Menu>
    </Box>
  )
}

export default ProductList
