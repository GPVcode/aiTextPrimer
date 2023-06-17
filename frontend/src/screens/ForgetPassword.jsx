import { useState } from 'react';
// import { toast } from 'react-toastify';
// import Loader from '../components/Loader';

const ForgetPassword = () => {
  const [email, setEmail] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = "email submit and return email data"

    if(res){
      alert("email sent!")
    } else{
      console.log('error')
    }
  
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center mx-auto pt-10">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={ submitHandler }>
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Submit your email address for verification.</label>
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

                <button 
                  type="submit" 
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                  variant='primary' 
                >
                  Send Email
                </button>
          
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgetPassword;
