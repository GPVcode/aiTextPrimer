//  This function privatizes pages only available to athenticated users.

//  Navigate is a component to redirect
import { Navigate, Outlet } from 'react-router-dom';
//  get user info from state, redirect otherwise
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;