import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import theme from './theme';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname === '/dashboard';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 