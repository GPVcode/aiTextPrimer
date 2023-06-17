import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='w-full flex justify-center items-center flex-col pt-10'>
        <h1 className='text-center head_text pb-5'><span className="underline underline-offset-3 decoration-8 gray-black dark:decoration-blue-600">AI Blog Primer</span></h1>
          <h4 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            TEST 2 Summarize online content with <br className='max-md:hidden' />
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">OpenAI GPT-4</span>
          </h4>
          <p className="text-center">Use this open-source AI content summarizer as a quick reading primer.</p>
          <div className='text-center pt-5'>
            <Link to='/login'>
              <button type="button" className="text-white  bg-gray-900 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800">
                Sign In
              </button>
            </Link>
            <Link to='/register'>
              <button type="button" className="text-white bg-gray-900 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:border-gray-800">
                Register
              </button>
            </Link>
            
          </div>
    </div>
  );
};

export default Hero;