import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/nav/Header';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { auth } from "./firebase";
import { useEffect } from 'react';
import {loginUser} from './redux/authSlice'
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  const dispatch = useDispatch()
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);
      dispatch(loginUser({
        email:user.email,
        token: idTokenResult.token,
      }))  
    } 
  });

  useEffect(() => {
    unsubscribe()
  },[])
  return ( 
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
         <Route index element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route> 
          <Route path='/register/complete' element={<RegisterComplete />}></Route>
          <Route path='/forgot/password' element={<ForgotPassword />}></Route>   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
