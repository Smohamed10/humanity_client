import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { getAuthUser } from '../Helper/Storage';

const Admin = () => {
    const Auth= getAuthUser();
    return<>{Auth &&Auth[0].status===1 ? <Outlet/> : <Navigate to={"/"}/>}</>;
};
export default Admin;