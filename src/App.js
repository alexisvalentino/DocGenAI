import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#4f46e5',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 