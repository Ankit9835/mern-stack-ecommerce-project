import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const interval =  setInterval(()=>{
            setCount((currVal) => --currVal)
        },1000)
        count === 0 && navigate('/login')

        return () => clearInterval(interval)
    },[count])
  return (
    <div>
      <p>Redirecting you in {count} seconds</p>
    </div>
  )
}

export default LoadingToRedirect
