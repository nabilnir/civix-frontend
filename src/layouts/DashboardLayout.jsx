import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Shared/SideBar'
import { useState } from 'react'

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''} lg:drawer-open`}>
      {/* Hidden checkbox to control drawer state (mobile only) */}
      <input 
        id="dashboard-drawer" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      
      {/* Main content area */}
      <div className="drawer-content flex flex-col w-full">
        {/* Navbar with toggle button (mobile only) */}
        <div className="navbar w-full bg-white border-b border-gray-200 lg:hidden sticky top-0 z-30">
          <div className="flex-none">
            <label 
              htmlFor="dashboard-drawer" 
              aria-label="open sidebar" 
              className="btn btn-square btn-ghost"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                strokeWidth="2" 
                fill="none" 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">
            <span className="font-['Satoshi'] font-bold text-lg text-[#242424]">Dashboard</span>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-[#f4f6f8] min-h-screen">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side lg:overflow-visible">
        <label 
          htmlFor="dashboard-drawer" 
          aria-label="close sidebar" 
          className="drawer-overlay lg:hidden"
        ></label>
        <Sidebar />
      </div>
    </div>
  )
}

export default DashboardLayout
