import { Routes, Route } from 'react-router';
import CitizenOverview from '../../../components/Dashboard/Citizen/CitizenOverview';
import MyIssues from '../../../components/Dashboard/Citizen/MyIssues';
import ReportIssue from '../../../components/Dashboard/Citizen/ReportIssue';
import PaymentHistory from '../../../components/Dashboard/Citizen/PaymentHistory';
import CitizenProfile from '../../../components/Dashboard/Citizen/CitizenProfile';

const CitizenDashboardPage = () => {
  return (
    <Routes>
      <Route index element={<CitizenOverview />} />
      <Route path="my-issues" element={<MyIssues />} />
      <Route path="report-issue" element={<ReportIssue />} />
      <Route path="payment-history" element={<PaymentHistory />} />
      <Route path="profile" element={<CitizenProfile />} />
    </Routes>
  );
}

export default CitizenDashboardPage;