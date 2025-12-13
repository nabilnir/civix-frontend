import React from 'react';
import { Routes, Route } from 'react-router';
import AdminOverview from '../../components/Dashboard/Admin/AdminOverview';
import AdminAllIssues from '../../components/Dashboard/Admin/AdminAllIssues';
import ManageUsers from '../../pages/Dashboard/Admin/ManageUsers';
import ManageStaff from '../../components/Dashboard/Admin/ManageStaff';
import AdminPayments from '../../components/Dashboard/Admin/AdminPayments';
import AdminProfile from '../../components/Dashboard/Admin/AdminProfile';

const AdminDashboardPage = () => {
  return (
    <Routes>
      <Route index element={<AdminOverview />} />
      <Route path="all-issues" element={<AdminAllIssues />} />
      <Route path="manage-users" element={<ManageUsers />} />
      <Route path="manage-staff" element={<ManageStaff />} />
      <Route path="payments" element={<AdminPayments />} />
      <Route path="profile" element={<AdminProfile />} />
    </Routes>
  );
};

export default AdminDashboardPage;

