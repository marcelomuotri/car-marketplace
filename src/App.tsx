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
import VerifyId from './features/VerifyId/VerifyId'
import MyProfile from './features/MyProfile/MyProfile'
import EditProfile from './features/EditProfile/EditProfile'
import TermsAndConditions from './features/TermsAndConditions/TermsAndConditions'
import { SnackbarProvider } from 'notistack'
import CreatePublication from './features/CreatePublication/CreatePublication'
import 'rsuite/dist/rsuite-no-reset.min.css'
import EditPublication from './features/CreatePublication/EditPublication'
import ResumePage from './features/CreatePublication/ResumePage'
import Support from './features/Support/Support'
import ResetPassword from './features/ResetPassword/ResetPassword'
import DeleteAccount from './features/DeleteAccount/DeleteAccount'
import NotFound from './features/NotFound/NotFound'

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
    element: <AuthGuard />, // AuthGuard como ruta superior
    children: [
      {
        path: '/',
        element: <Layout />, // Layout como hijo de AuthGuard
        children: [
          {
            index: true,
            element: <Navigate to='/home' replace />,
          },
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'createPublication',
            element: <CreatePublication />,
          },
          {
            path: 'editPublication/:publicationId',
            element: <EditPublication />,
          },
          {
            path: 'resumePage/:publicationId',
            element: <ResumePage />,
          },
          {
            path: 'profile',
            element: <MyProfile />,
          },
          {
            path: 'editProfile',
            element: <EditProfile />,
          },
          {
            path: 'support',
            element: <Support />,
          },
          {
            path: 'verifyId',
            element: <VerifyId />,
          },
          {
            path: 'termsAndConditions',
            element: <TermsAndConditions />,
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
  {
    path: 'resetPassword',
    element: <ResetPassword />,
  },
  {
    path: 'deleteAccount',
    element: <DeleteAccount />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <MyNotificationsProvider />
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  )
}

export default App
