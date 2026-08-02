import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from '@chakra-ui/react';

const PrivateRoutes = ({children}:any) => {
  const AdminAuth =useSelector((store:any)=>{
    return store.authReducer.isAdminAuth;
  })
  const isAuth = useSelector((store:any)=>{
    return store.authReducer.isAuth;
  })
  const authChecked = useSelector((store:any)=>{
    return store.authReducer.authChecked;
  })
  const location = useLocation();

  if (!authChecked) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    );
  }

  if(AdminAuth){
    return children;
  }
  if(isAuth){
    return children;
  }

  return <Navigate to="/login" state={location.pathname} replace={true}/>;
}

export default PrivateRoutes;
