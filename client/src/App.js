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
import ProductCreate from './pages/AdminRoutes/product/ProductCreate';
import AllProducts from './pages/AdminRoutes/product/AllProducts';
import EditProduct from './pages/AdminRoutes/product/EditProduct';
import ViewProduct from './pages/ViewProduct';
import CategoryBasedOnId from './pages/category/CategoryBasedOnId';
import SubCategoryBasedOnId from './pages/subcategory/SubCategoryBasedOnId';
import Shop from './pages/Shop';
import Cart from './pages/Cart';


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
         <Route index element={
            <Home />
         }></Route>
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
          <Route path='/admin/products' element={<ProtectedRoute><ProductCreate /></ProtectedRoute>}></Route>
          <Route path='/admin/product' element={<ProtectedRoute><AllProducts /></ProtectedRoute>}></Route> 
          <Route path='/admin/product/:slug' element={<ProtectedRoute><EditProduct /></ProtectedRoute>}></Route>
          <Route path='/product/:slug' element={<ViewProduct />}></Route>
          <Route path='/category/:slug' element={<CategoryBasedOnId />}></Route>
          <Route path='/sub-category/:slug' element={<SubCategoryBasedOnId />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/cart' element={<Cart />}></Route>               
      </Routes>
    </BrowserRouter>
  );
}

export default App;
