import React, { useRef } from 'react';
import axios from '../axiosConfig';
import { data, Link, useNavigate } from 'react-router-dom';
const login = () => {
   const navigate=useNavigate()
   const emailDom = useRef(null);
    const passwordDom = useRef(null);
      async function handlesubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value;

    if (
      !emailValue ||
      !passwordValue
    ) {
      alert('Please provide all required information.');
      return;
    }

    try {
      const response = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue,
      });

      console.log('Registration response:', response.data);
      alert('login successful.');
      localStorage.setItem('token',data.token)
      navigate('/');

    } catch (error) {
      console.error('Registration error:', error);
      console.error('Backend response:', error.response?.data);

      alert(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        'login failed '
      );
    }
  }
  return (
   <section>
      <form onSubmit={handlesubmit}>

        <div>
          <label>Email:</label>
          <input ref={emailDom} type="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input ref={passwordDom} type="password" required />
        </div>

        <button type="submit">login</button>
      </form>
     <Link to='/register'>register</Link>
    </section>
  )
}

export default login