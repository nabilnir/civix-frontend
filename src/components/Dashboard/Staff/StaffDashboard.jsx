import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Shared/SideBar';

const StaffDashboard = () => {
  return (
    <div className="relative min-h-screen md:flex bg-base-100">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

