import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // helps grab value we created in initial state
  const mode = useSelector((state) => state.mode)
  // Set up theme to pass into material UI below in ThemeProvider
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* Convenient CSS reset*/}
        <CssBaseline /> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
