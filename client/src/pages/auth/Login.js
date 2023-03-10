import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import { RoleBasedRedirection, submitUser } from "../../utils/user";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
     

      
      try {
        const res = await submitUser(idTokenResult.token)
        if(res){
          console.log(res)
          dispatch(loginUser({
           email:res.data.email,
           token: idTokenResult.token,
           name:res.data.email.split("@")[0],
           role:res.data.role,
           _id:res.data._id
          }))
          localStorage.setItem('token', idTokenResult.token)
         //await RoleBasedRedirection(res)
         if(res.data.role === 'admin'){
          navigate('/admin/dashboard')
         } else {
          navigate('/user/dashboard')
         }
         }
      } catch (error) {
        console.log(error)
      }
      
      
      // navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>

      <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3 bg-danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
