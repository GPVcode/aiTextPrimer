import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ForgetPassword from './screens/ForgetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route path='/reset-password' element={<ForgetPassword />} />
      <Route index={ true } path='/' element={ <HomeScreen /> } />
      <Route path='/login' element={ <LoginScreen /> } />
      <Route path='/register' element={ <RegisterScreen /> } />
      <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={ <ProfileScreen /> } />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);

