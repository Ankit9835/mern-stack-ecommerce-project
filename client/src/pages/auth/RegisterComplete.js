import Password from 'antd/es/input/Password';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { submitUser } from '../../utils/user';


const RegisterComplete = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  useEffect(() => {
    setEmail(localStorage.getItem('emailForRegistration'))
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const result = await auth.signInWithEmailLink(
            email,
            window.location.href
          );
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            submitUser(idTokenResult.token).then((res) => dispatch(loginUser({
              email:res.data.email,
              token: idTokenResult.token,
              name:res.data.email.split("@")[0],
              role:res.data.role,
              _id:res.data._id
            }))
            )
            .catch();
            localStorage.setItem('token', idTokenResult.token)
            console.log("user", user, "idTokenResult", idTokenResult);
            // redirect
            navigate("/");
          }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }

  const registerFormComplete = () => {
   return <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mt-2"
        value={email}
        disabled
      />

        <input
        type="password"
        className="form-control mt-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-raised mt-4">
        Register
      </button>
    </form>
  }
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration </h4>
          
          {registerFormComplete()}
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete
