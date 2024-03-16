import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { getAuthUser } from '../Helper/Storage';

const Guest = () => {
    const Auth= getAuthUser();
    return<>{!Auth ? <Outlet/> : <Navigate to={"/"}/>}</>;
};
export default Guest;