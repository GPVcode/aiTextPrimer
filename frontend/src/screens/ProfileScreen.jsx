import { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
        } else{
            try{
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated')
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    };
    
  return (

    <container>
        <h1>Update Profile</h1>

        <form onSubmit={ submitHandler }>
            <div className='my-2' controlId='name'>
                <label>Name</label>
                <input
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                ></input>
            </div>

            <div className='my-2' controlId='email'>
                <label>Email Address</label>
                <input
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                ></input>
            </div>

            <div className='my-2' controlId='password'>
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                ></input>
            </div>

            <div className='my-2' controlId='confirmPassword'>
                <label>Confirm Password</label>
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={ (e) => setConfirmPassword(e.target.value) }
                ></input>
            </div>

            {isLoading && <Loader />}
            
            <button type='submit' variant='primary' className='mt-3'>
               b Update
            </button>

        </form>
    </container>
  )
}

export default ProfileScreen


