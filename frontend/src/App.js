import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    
    <div className='min-h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100 via-red-50 to-green-100 dark:bg-gray-900'>
      
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
