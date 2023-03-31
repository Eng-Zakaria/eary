import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
    const[userId]=useParams();
  return (
    <div>
      <h1>user Detealis for {userId}</h1>
      <h2>hello </h2>
    </div>
  )
}

export default UserDetails
