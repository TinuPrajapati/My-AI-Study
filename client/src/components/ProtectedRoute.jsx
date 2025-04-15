import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loader/>
  }

  return <>{authUser?children:<Navigate to="/login"/>}</>;
};

export default ProtectedRoute;