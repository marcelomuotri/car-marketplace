import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './routes/Layout'
import AuthGuard from './routes/auth.guard'
import Home from './features/Home/Home'
import Login from './features/Login/Login'
import { ThemeProvider } from '@mui/material/styles'
import appTheme from './framework/theme/app-theme'
import { MyNotificationsProvider } from './framework/notifications/notifications-service'
import { Provider } from 'react-redux'
import store from './framework/state/store'
import Register from './features/Register/Register'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './framework/i18n/es.json'
import 'intl-pluralrules'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
      },
    },
    es: {
      translation: es,
    },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error</div>,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'about',
            element: <div>About</div>,
          },
          {
            path: 'categories',
            element: <Home />,
          },
          {
            index: true,
            element: <Navigate to='/home' replace />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <MyNotificationsProvider />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
