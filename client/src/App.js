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
import { currentUser } from './utils/user';
import ProtectedRoute from './pages/ProtectedRoute';
import User from './pages/User';
import Password from './pages/auth/Password';
import Wishlist from './pages/auth/Wishlist';
import Admin from './pages/AdminRoutes/Admin';
import CategoryCreate from './pages/AdminRoutes/category/CategoryCreate';
import UpdateCategory from './pages/AdminRoutes/category/UpdateCategory';
import SubCreate from './pages/AdminRoutes/subcategory/SubCreate';
import UpdateSubCreate from './pages/AdminRoutes/subcategory/UpdateSubCreate';



function App() {
  const dispatch = useDispatch()
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    
      const idTokenResult = await user.getIdTokenResult();
      console.log("user", user);
      currentUser(idTokenResult.token).then((res) =>  dispatch(loginUser({
        email:res.data.user.email,
        token: idTokenResult.token,
        name:res.data.user.email.split("@")[0],
        role:res.data.user.role,
        _id:res.data.user._id
      })) ).catch((error) => console.log(error))
      
    
  });

  useEffect(() => {
    unsubscribe()
  },[])
  return ( 
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
         <Route index element={<ProtectedRoute>
            <Home />
         </ProtectedRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route> 
          <Route path='/register/complete' element={<RegisterComplete />}></Route>
          <Route path='/forgot/password' element={<ForgotPassword />}></Route>
          <Route path='/user/dashboard' element={<ProtectedRoute><User /></ProtectedRoute>}></Route>
          <Route path='/user/password' element={<ProtectedRoute><Password /></ProtectedRoute>}></Route> 
          <Route path='/user/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>}></Route>
          <Route path='/admin/dashboard' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route> 
          <Route path='/admin/category' element={<ProtectedRoute><CategoryCreate /></ProtectedRoute>}></Route>
          <Route path='/admin/category/:slug' element={<ProtectedRoute><UpdateCategory /></ProtectedRoute>}></Route>
          <Route path='/admin/sub' element={<ProtectedRoute><SubCreate /></ProtectedRoute>}></Route>
          <Route path='/admin/sub/:slug' element={<ProtectedRoute><UpdateSubCreate /></ProtectedRoute>}></Route>         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
