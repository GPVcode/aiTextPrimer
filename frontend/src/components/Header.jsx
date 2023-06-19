import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'
import logo from '../assets/GPVdev-Black.svg'


const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      // request that destroys cookie
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  }
  // max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4
  return (
    
      <Navbar fluid rounded class="w-full bg-gray-900 border-gray-900 dark:white px-2 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
        <div class="w-full flex flex-wrap items-center justify-between bg-gray-900 dark:bg-gray-900 px-20">
          <Navbar.Brand>
            <Link to='/' alt='ai_logo' class="flex items-center"> 
            <span class="self-center text-1xl font-semibold whitespace-nowrap text-white dark:text-white">Developed by</span>
            <img src={logo} class=" pl-2 h-11" alt="GPVdev Logo" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              as='button'
              onClick={() =>
                window.open("https://github.com/GPVcode/aiTextPrimer", "_blank")
              }
              class='block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
            >
            GitHub
            </Navbar.Link>
            <Navbar.Link
              active
            >
              { userInfo ? <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/profile'>Profile</Link> : <Link class='block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to='/login'>Login</Link>}
            </Navbar.Link>
            <Navbar.Link
              active
            >
              { userInfo ? 
                <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={ logoutHandler }>Logout</Link> :
                <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/register'>Register</Link>}
            </Navbar.Link>
          </Navbar.Collapse>
        </div>
      </Navbar>

  );
};

export default Header;


// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/usersApiSlice';
// import { logout } from '../slices/authSlice'
// import logo from '../assets/GPVdev-Black.svg'


// const Header = () => {

//   const { userInfo } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try{
//       // request that destroys cookie
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate('/');
//     } catch(err) {
//       console.log(err)
//     }
//   }

//   return (
//     <>
//     <nav class="bg-gray-900 border-gray-900 dark:white">
//       <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

//         <Link to='/' alt='ai_logo' class="flex items-center"> 
//         <span class="self-center text-1xl font-semibold whitespace-nowrap text-white dark:text-white">Developed by</span>
//         <img src={logo} class=" pl-2 h-11" alt="GPVdev Logo" />
        
//         </Link>
//         <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-0 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//           <span class="sr-only">Open main menu</span>
//           <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
//         </button>
//         <div class="hidden w-full md:block md:w-auto" id="navbar-default">
//           <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-900 rounded-lg bg-gray-900 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <Link
//               type='button'
//               onClick={() =>
//                 window.open("https://github.com/GPVcode/aiTextPrimer", "_blank")
//               }
//               class='block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
//               >
//                 GitHub
//               </Link>
//             </li>
//             <li>
//               { userInfo ? <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/profile'>Profile</Link> : <Link class='block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to='/login'>Login</Link>}
//             </li>
//             <li>
//               { userInfo ? 
//               <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={ logoutHandler }>Logout</Link> :
//                <Link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-white hover:text-gray-950 md:hover:bg-white md:border-0 md:hover:text-gray-950 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/register'>Register</Link>}

//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
  
//     </>
//   );
// };

// export default Header;