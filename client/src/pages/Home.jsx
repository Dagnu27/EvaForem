import React from 'react'
import { useContext } from 'react'
import { AppState } from '../App'
const Home = () => {
  const {user} =useContext(AppState)
  return (
    <div>
      <h1>Home</h1>
      <br />
      <br />
      <br />
      <br />
      <h1>WellCome:{user.username}</h1>
    </div>
  )
}

export default Home