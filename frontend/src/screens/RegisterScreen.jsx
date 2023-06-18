import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation();

    // utilize useEffect to navigate after userInfo is authorized
    useEffect(() => {
        if (userInfo) {
        navigate('/');
        } 
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
        } else{
            try{
                const res = await register({ name, email, password }).unwrap();
                console.log("res", res)
                dispatch(setCredentials({ ...res }))
                navigate('/');
            } catch(err){
                toast.error(err?.data?.message || err.error);
            }
        }
    }
  return (

    // <section className="h-screen bg-gray-50 dark:bg-gray-900">
    
      <div className="h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100 via-red-50 to-green-100 dark:bg-gray-900 flex flex-row items-start justify-center mx-auto pt-20">
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Register an Account</h1>

            <form className="space-y-4 md:space-y-6" onSubmit={ submitHandler }>
                <div>
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                        name='name'
                        type='text'
                        id='name'
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Enter Name'
                        required
                        value={name}
                        onChange={ (e) => setName(e.target.value) }
                    ></input>
                </div>

                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                    <input
                      name="email" 
                      id="email" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Enter Email" 
                      required
                      type='email'
                      value={email}
                      onChange={ (e) => setEmail(e.target.value) }
                    ></input>
                </div>

                <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                    ></input>
                </div>

                <div>
                    <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required
                        value={confirmPassword}
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                    ></input>
                </div>
                
                { isLoading && <Loader>Loading..</Loader>}

                <button 
                  type="submit" 
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                  variant='primary' 
                >
                  Sign Up
                </button>


                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    <div>
                        Already have an account? <Link className="font-medium text-blue-500 hover:underline dark:text-primary-500" to='/login'>Login</Link>
                    </div>
                </p>
            </form>
          </div>
        </div>
      </div>
    // </section>
  )
}

export default RegisterScreen
