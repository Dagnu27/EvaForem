import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState, useEffect, createContext } from 'react';
import axios from './axiosConfig';

export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function checkUser() {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('/users/check', {
        headers: { Authorization: 'Bearer ' + token },
      });
      setuser(data);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register') checkUser();
  }, [pathname]);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;