import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function Layout() {
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <div key={location.pathname}>
        <Outlet />
      </div>
    </div>
  )
}
