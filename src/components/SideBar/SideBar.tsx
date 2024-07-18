import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  IconButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStyles } from './sidebar.styles'
import PublicationsIcon from '../../assets/icons/PublicationsIcon'
import ProfileIcon from '../../assets/icons/ProfileIcon'
import SupportIcon from '../../assets/icons/SupportIcon'
import CloseSessionIcon from '../../assets/icons/CloseSessionIcon'
import { useTheme } from '@mui/material'
import CloseIcon from '../../assets/icons/Close'
import { useAuthService } from '../../framework/state/services/authService'

interface sideBarProps {
  setMenuOpened: (value: boolean) => void
  menuOpened: boolean
}

const Sidebar = ({ setMenuOpened, menuOpened }: sideBarProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { classes: styles } = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const theme = useTheme()
  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { logoutUser } = useAuthService()

  const menuOptions = [
    { text: t('publications'), icon: <PublicationsIcon />, path: '/' },
    { text: t('profile'), icon: <ProfileIcon />, path: '/profile' },
    { text: t('support'), icon: <SupportIcon />, path: '/support' },
  ]

  const handleLogout = () => {
    logoutUser()
    // Aquí puedes agregar tu lógica para cerrar sesión, como limpiar el estado o llamar a una API
  }

  const bottomOptions = [
    {
      text: t('closeSession'),
      icon: <CloseSessionIcon />,
      action: handleLogout,
    },
    {
      text: t('termsAndConditions'),
      path: '/privacy-policy',
    },
  ]

  const handleListItemClick = (index: number, path: string): void => {
    setSelectedIndex(index)
    navigate(path)
    setMenuOpened(false)
  }

  const toggleSidebar = () => {
    setMenuOpened(!menuOpened)
  }

  return (
    <Box className={`${styles.sideBarContainer}`}>
      <Box>
        {matchesDownSm && (
          <Box className={styles.closeIcon}>
            <IconButton onClick={toggleSidebar}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <List sx={{ marginTop: menuOpened ? 0 : 50 }}>
          {menuOptions.map((option, index) => (
            <ListItemButton
              disableRipple
              key={index}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, option.path)}
              className={styles.listItemButton}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText
                primary={option.text}
                className={styles.optionText}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <List>
        {bottomOptions.map((option, index) => (
          <ListItemButton
            key={index}
            disableRipple
            onClick={() =>
              option.action ? option.action() : navigate(option.path)
            }
            className={styles.listItemButton + ' ' + styles.itemBottom}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
