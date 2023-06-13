import Hero from '../components/Hero'
import Summarizer from '../components/Summarizer';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
    <div className='main'>
      <div className='gradient'/>
    </div>
      <div className='app'>
      { !userInfo ? <Hero /> : <Summarizer />}
      </div>
    </>
  )
}

export default HomeScreen
