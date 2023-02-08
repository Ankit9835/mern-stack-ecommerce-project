import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingToRedirect from '../components/LoadingToRedirect'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state)=> state.auth)
   
    if (!user) {
      return <Navigate to='/login' />
      }
      return children;
}

export default ProtectedRoute
