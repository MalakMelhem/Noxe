import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Guard({isLogged}) {
  return (
    <>{isLogged? <Outlet />:<Navigate to='login' />}</>
  );
}

export default Guard