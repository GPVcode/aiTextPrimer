import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
