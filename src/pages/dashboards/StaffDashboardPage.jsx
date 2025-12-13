import React from 'react';
import { Routes, Route } from 'react-router';
import StaffOverview from '../../components/Dashboard/Staff/StaffOverview';
import AssignedIssues from '../../components/Dashboard/Staff/AssignedIssues';
import StaffProfile from '../../components/Dashboard/Staff/StaffProfile';

const StaffDashboardPage = () => {
  return (
    <Routes>
      <Route index element={<StaffOverview />} />
      <Route path="assigned-issues" element={<AssignedIssues />} />
      <Route path="profile" element={<StaffProfile />} />
    </Routes>
  );
};

export default StaffDashboardPage;

