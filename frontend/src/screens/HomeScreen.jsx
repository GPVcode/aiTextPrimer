import Hero from '../components/Hero'
import Summarizer from '../components/Summarizer';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      { !userInfo ? <Hero /> : <Summarizer />}
    </div>
  )
}

export default HomeScreen
