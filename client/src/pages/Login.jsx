import React, { useRef } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

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
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Login failed'
      );
    }
  }

  return (
    <AuthLayout>
      <h3>Login to your account</h3>
      <p className="auth__sub">
        Don't have an account? <Link to="/register">Create a new account</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <input ref={emailDom} type="email" placeholder="Email address" required />
        <input ref={passwordDom} type="password" placeholder="Password" required />
        <button type="submit" className="btn btn--blue btn--full">Login</button>
      </form>
    </AuthLayout>
  );
};

export default Login;