import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import About from './pages/About.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/register.tsx';
import Products from './pages/Products.tsx';
import ProductPage from './pages/Product.tsx';
import Shipping from './pages/Shipping.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import '@radix-ui/themes/styles.css';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import NotFound from './pages/not-found.tsx';
import DashboardHome from './pages/dashboard/index.tsx';
import UserPanel from './pages/dashboard/users.tsx';
import AppLayout from './layouts/app-layout.tsx';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path="/" element={<App />} />
              <Route path="about" element={<About />} />
              <Route path="products">
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductPage />} />
                <Route path="shipping" element={<Shipping />} />
              </Route>
            </Route>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="users" element={<UserPanel />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
