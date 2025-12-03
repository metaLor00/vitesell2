import { Outlet } from "react-router";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-light">
        <Outlet  />
    </div>
  );
};

export default AppLayout;