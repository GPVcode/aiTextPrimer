// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice'


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

  return (
    <>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to='/' alt='ai_logo' className='w-28 object-contain '>AI Blog Primer</Link>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
              type='button'
              onClick={() =>
                window.open("https://github.com/GPVcode/aiTextPrimer", "_blank")
              }
              className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
              >
                GitHub
              </Link>
            </li>
            <li>
              { userInfo ? <Link class=" block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to='/profile'>Profile</Link> : <Link className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to='/login'>Login</Link>}
            </li>
            <li>
              { userInfo ? 
              <Link class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={ logoutHandler }>Logout</Link> :
               <Link className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to='/register'>Register</Link>}

            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* <header className='bg-white dark:bg-gray-900 fixed w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
      <nav className='flex justify-between items-center w-full p-3'>
        <Link to='/' alt='ai_logo' className='w-28 object-contain'>AI Blog Primer</Link>

        <button
          type='button'
          onClick={() =>
            window.open("https://github.com/GPVcode/aiTextPrimer", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button>
      </nav>
    </header> */}
    {/* <header className='w-full flex justify-center items-center flex-col'>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>AI Blog Primer</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              { userInfo ? (
                <>
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={ logoutHandler }> 
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
                </>
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header> */}
    </>
  );
};

export default Header;