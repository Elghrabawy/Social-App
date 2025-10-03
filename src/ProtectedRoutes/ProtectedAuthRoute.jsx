import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';

export default function ProtectedAuthRoute({ children }) {
  const {isLoggedIn, setIsLoggedIn} = useContext(authContext);
  return (isLoggedIn ? <Navigate to="/" replace /> : children);
}
