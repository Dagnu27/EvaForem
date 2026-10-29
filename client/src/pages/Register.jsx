
import React, { useRef } from 'react';
import axios from '../axiosConfig';
import {Link, useNavigate } from 'react-router-dom';

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
    <section>
      <form onSubmit={handlesubmit}>
        <div>
          <label>Username:</label>
          <input ref={userNameDom} type="text" required />
        </div>

        <div>
          <label>First name:</label>
          <input ref={firstNameDom} type="text" required />
        </div>

        <div>
          <label>Last name:</label>
          <input ref={lastNameDom} type="text" required />
        </div>

        <div>
          <label>Email:</label>
          <input ref={emailDom} type="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input ref={passwordDom} type="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to='/login'>login</Link>
    </section>
  );
};

export default Register;
