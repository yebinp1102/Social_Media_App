import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import Lgoin from 'pages/Login';
import ProfilePage from 'pages/ProfilePage';
import Register from 'pages/Register';
import Header from 'components/Header';
import DarkModeBtn from 'components/DarkModeBtn';

function App() {


  return (
    <BrowserRouter>
        <Header />
        <DarkModeBtn />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Lgoin/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
