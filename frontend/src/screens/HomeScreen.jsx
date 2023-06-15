import Hero from '../components/Hero'
import Summarizer from '../components/Summarizer';
import { useSelector } from 'react-redux';
// import Footer from '../components/Footer'
const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className='app pt-10'>
      { !userInfo ? <Hero /> : <Summarizer />}
      </div>
      
      {/* <Footer /> */}
    </>
  )
}

export default HomeScreen
