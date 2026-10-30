import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppState } from '../App';

const Header = () => {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedIn = Boolean(user?.userid);

  function handleLogout() {
    localStorage.removeItem('token');
    setuser({});
    setOpen(false);
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo">NET<span>/</span>WKU</Link>

        <button className="header__toggle" onClick={() => setOpen(!open)}>☰</button>

        <nav className={`header__nav ${open ? 'open' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/" onClick={() => setOpen(false)}>How it works</Link>
          {isLoggedIn ? (
            <button className="btn btn--blue" onClick={handleLogout}>LOG OUT</button>
          ) : (
            <Link to="/login" className="btn btn--blue" onClick={() => setOpen(false)}>SIGN IN</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;