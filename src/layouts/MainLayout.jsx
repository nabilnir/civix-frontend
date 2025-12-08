import { Outlet } from 'react-router'

import Footer from '../components/Shared/Footer'
import Navbar from '../components/Shared/Navbar'
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
