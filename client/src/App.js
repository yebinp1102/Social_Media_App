import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import Register from 'pages/Register';
import Header from 'components/Header';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
