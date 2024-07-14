import { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useStyles } from './productList.styles'
import { Product } from '../../../../framework/types'

const data = [
  {
    id: 1,
    product: 'Producto 1',
    date: '2023-07-01',
    price: '$10',
    visits: 5,
    contacts: 2,
  },
  {
    id: 2,
    product: 'Producto 2',
    date: '2023-07-02',
    price: '$20',
    visits: 15,
    contacts: 5,
  },
  {
    id: 3,
    product: 'Producto 3',
    date: '2023-07-03',
    price: '$30',
    visits: 25,
    contacts: 8,
  },
  {
    id: 4,
    product: 'Producto 4',
    date: '2023-07-04',
    price: '$40',
    visits: 35,
    contacts: 12,
  },
]

const columns = {
  photo: {
    label: '',
    width: 50,
  },
  product: {
    label: 'Producto',
    width: 200,
  },
  date: {
    label: 'Fecha',
    width: 150,
  },
  status: {
    label: 'Estado',
    width: 150,
  },
  price: {
    label: 'Precio',
    width: 150,
  },
  visitors: {
    label: 'Visitas',
    width: 150,
  },
  contacts: {
    label: 'Contactos',
    width: 150,
  },
  options: {
    label: '',
    width: 150,
  },
}

interface ProductsListProps {
  products: Product[]
}

const CheckboxList = ({ products }: ProductsListProps) => {
  console.log(products)
  const [checked, setChecked] = useState<number[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const { classes: styles } = useStyles()

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleToggleAll = () => {
    if (allChecked) {
      setChecked([])
    } else {
      setChecked(data.map((item) => item.id))
    }
    setAllChecked(!allChecked)
  }

  // Estado y funciones para el menú
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={styles.container}>
      <List className={styles.list}>
        <ListItem className={styles.list_header}>
          <ListItemIcon>
            <Checkbox
              edge='start'
              checked={allChecked}
              tabIndex={-1}
              disableRipple
              onChange={handleToggleAll}
            />
          </ListItemIcon>
          {Object.values(columns).map((column) => (
            <ListItemText
              primary={column.label}
              sx={{ width: column.width, flex: 'none' }}
            />
          ))}
        </ListItem>
        {products?.map((item, index) => {
          const labelId = `checkbox-list-label-${item.id}`
          return (
            <ListItem
              key={item.id}
              role={undefined}
              dense
              className={styles.list_header_listItem}
              sx={{ alignItems: 'center' }}
            >
              <ListItemIcon>
                <Checkbox
                  onClick={handleToggle(index)}
                  edge='start'
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <Box
                sx={{
                  height: '50px',
                  backgroundColor: 'black',
                  width: columns['photo'].width,
                }}
              />
              <ListItemText
                primary={item.title}
                sx={{ width: columns['product'].width, flex: 'none' }}
              />
              <ListItemText
                primary={'25/07/2023'}
                sx={{ width: columns['date'].width, flex: 'none' }}
              />
              <ListItemText
                primary='Activo'
                sx={{ width: columns['status'].width, flex: 'none' }}
              />
              <ListItemText
                primary={item.price}
                sx={{ width: columns['price'].width, flex: 'none' }}
              />
              <ListItemText
                primary={item.visitors}
                sx={{ width: columns['visitors'].width, flex: 'none' }}
              />
              <ListItemText
                primary={item.contacts}
                sx={{ width: columns['contacts'].width, flex: 'none' }}
              />
              <ListItemIcon>
                <IconButton
                  edge='end'
                  aria-label='options'
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Opción 1</MenuItem>
                  <MenuItem onClick={handleClose}>Opción 2</MenuItem>
                </Menu>
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default CheckboxList
