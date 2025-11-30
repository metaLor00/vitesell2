import React from 'react';
import { Outlet } from 'react-router';
import { assetsMap } from '../assets/assets-map';
import { AuthCurrentCardContextProvider } from '../store/cotexts/auth-current-card';
const AuthLayout: React.FC = () => {
  return (
    <AuthCurrentCardContextProvider>
      <div className="min-h-screen overflow-hidden relative flex items-center justify-center md:justify-start border-amber-500 border-2   bg-gray-light">
        <div className="absolute top-0 left-0 hidden sm:block">
          <img src={assetsMap.authbg1} alt="authbg1" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-center md:justify-start md:px-32 z-10">
          <Outlet />
        </div>
        <div className="absolute bottom-0 right-0 hidden sm:block">
          <img src={assetsMap.authbg2} alt="authbg2" className="w-full h-full object-cover" />
        </div>
      </div>
    </AuthCurrentCardContextProvider>
  );
};

export default AuthLayout;
