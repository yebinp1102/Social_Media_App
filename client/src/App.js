import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Lgoin from 'pages/Login';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import Header from 'components/Header';
import DarkModeBtn from 'components/DarkModeBtn';
import ProfileEdit from 'pages/ProfileEdit';

function App() {

  return (
    <BrowserRouter>
        <Header />
        <DarkModeBtn />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Lgoin/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/users/:userId' element={<Profile />} />
          <Route path='/users/edit/:userId' element={<ProfileEdit />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
