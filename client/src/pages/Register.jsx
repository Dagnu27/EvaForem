import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig'
import { Navigate, useNavigate } from 'react-router-dom'
const register = () => {

  const userNameDom=useRef(null)
  const firstNameDom=useRef(null)
  const lastNameDom=useRef(null)
  const emailDom=useRef(null)
  const passwordDom=useRef(null)

 async function handlesubmit(e) {
  e.preventDefault();
  const usernameValue=userNameDom.current.value;
  const firstnameValue=firstNameDom.current.value;
  const lastnameValue=lastNameDom.current.value;
  const emailValue=emailDom.current.value;
  const passwordValue=passwordDom.current.value;
  if (
    !usernameValue||
    !firstnameValue||
    !lastnameValue||
    !emailValue||
    !passwordValue||
  ) {
    alert("please provide all requred information ")
    return;
  }
 try {
   await axios.post('user/register',{
      username:usernameValue,
      firstname:firstnameValue,
      lastname:lastnameValue,
      email:emailValue,
      password:passwordValue,

   });
alert("register seccesed. please login ")
Navigate('/login')
 } catch (error) {
  alert("some thing went wrong ")
  console.log(error.response);
  
 }
  
 }



  return (
    <section>
     <form onSubmit={handlesubmit}>
    <div>
      <span>username:</span>
      <input   ref={userNameDom} type="text" placeholder='username' />
    </div>
   <br />

  <div>
      <span>firstname:</span>
      <input ref={firstNameDom} type="text" placeholder='firstname' />
    </div>
   <br />

   <div>
      <span>lastname:</span>
      <input ref={lastNameDom} type="text" placeholder='lastname' />
    </div>
   <br />

   <div>
      <span>email:</span>
      <input ref={emailDom} type="text" placeholder='email' />
    </div>
   <br />

   <div>
      <span>password:</span>
      <input ref={passwordDom} type="text" placeholder='password' />
    </div>
   <br />
   <button type='submit'>Register</button>
     </form>
    </section>
  )
}

export default register