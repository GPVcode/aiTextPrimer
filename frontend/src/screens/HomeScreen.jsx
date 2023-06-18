import Hero from '../components/Hero'
import Summarizer from '../components/Summarizer';
import { useSelector } from 'react-redux';
// import Footer from '../components/Footer'
const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100 via-red-50 to-green-100 dark:bg-gray-900 flex flex-row items-start justify-center mx-auto pt-20">
      
      { !userInfo ? <Hero /> : <Summarizer />}
      </div>
      
      {/* <Footer /> */}
    </>
  )
}

export default HomeScreen

