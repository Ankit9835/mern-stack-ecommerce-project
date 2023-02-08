import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingToRedirect from '../components/LoadingToRedirect'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state)=> state.auth)
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const interval =  setInterval(()=>{
            setCount((currVal) => --currVal)
        },1000)
        count === 0 && navigate('/login')

        return () => clearInterval(interval)
    },[count])
    console.log('count',count)
    if (!user) {
        return (
            <p>Redirecting you in {count} seconds</p>
        )
      }
      return children;
}

export default ProtectedRoute
