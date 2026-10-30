
import React, { useRef } from 'react';
import axios from '../axiosConfig';
import {Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handlesubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value.trim();
    const firstnameValue = firstNameDom.current.value.trim();
    const lastnameValue = lastNameDom.current.value.trim();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert('Please provide all required information.');
      return;
    }

    try {
      const response = await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      console.log('Registration response:', response.data);
      alert('Registration successful. Please log in.');
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error);
      console.error('Backend response:', error.response?.data);

      alert(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        'Registration failed.'
      );
    }
  }

  return (
   <AuthLayout>
    <h3>Join the network</h3>
    <p className="auth__sub">
      Already have an account? <Link to="/login">Sign in</Link>
    </p>
    <form onSubmit={handlesubmit}>
      <input ref={userNameDom} type="text" placeholder="Username" required />
      <div className="row">
        <input ref={firstNameDom} type="text" placeholder="First name" required />
        <input ref={lastNameDom} type="text" placeholder="Last name" required />
      </div>
      <input ref={emailDom} type="email" placeholder="Email address" required />
      <input ref={passwordDom} type="password" placeholder="Password" required />
      <button type="submit" className="btn btn--blue btn--full">Agree and Join</button>
    </form>
    <Link to="/login" className="auth__link">Already have an account?</Link>
  </AuthLayout>
  );
};

export default Register;
