import { useState } from 'react'
import defineConfig from './../eslint.config';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { HeroUIProvider } from '@heroui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import FeedsPage from './pages/FeedsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute';
import SinglePostPage from './pages/SinglePostPage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: <AuthLayout />, children: [
        { path: 'login', element: <ProtectedAuthRoute><LoginPage /> </ProtectedAuthRoute> },
        { path: 'register', element: <ProtectedAuthRoute><RegisterPage /></ProtectedAuthRoute> }
      ]
    },
    {
      path: '/', element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoute><FeedsPage /></ProtectedRoute> },
        { path: "post/:id", element: <ProtectedRoute><SinglePostPage /></ProtectedRoute> },
        { path: '*', element: <NotFoundPage /> }
      ]
    }
  ])

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
