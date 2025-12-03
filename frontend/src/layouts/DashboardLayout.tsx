import { Outlet } from 'react-router';
 
const DashboardLayout: React.FC = () => {
  return (
       
      <div className="min-h-screen flex flex-col border border-red-500">
        <Outlet />
      </div>
  );
};

export default DashboardLayout;
