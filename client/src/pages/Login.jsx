import React, { useRef } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailDom.current.value.trim();
    const password = passwordDom.current.value;

    if (!email || !password) {
      alert('Please provide all required information.');
      return;
    }

    try {
      const { data } = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
      window.location.reload(); // makes App re-run checkUser with the new token
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Login failed'
      );
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input ref={emailDom} type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordDom} type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Create a new account</Link>
    </section>
  );
};

export default Login;