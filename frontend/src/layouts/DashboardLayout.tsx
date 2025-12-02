import { Outlet } from "react-router";

const DashboardLayout: React.FC  = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-300">
       <Outlet />
    </div>
  );
};      

export default DashboardLayout;