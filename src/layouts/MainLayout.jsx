import { Outlet } from 'react-router'

import Footer from '../components/Shared/Footer'
import Navbar from '../components/Shared/Navbar'
import useTitle from '../hooks/useTitle'

const MainLayout = () => {
  useTitle(); // Automatically updates title based on current route
  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
