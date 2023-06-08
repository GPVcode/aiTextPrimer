import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className='my-2'>
        < Outlet />
      </Container>
    </div>
  );
}

export default App;
