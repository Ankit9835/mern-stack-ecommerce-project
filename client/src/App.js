import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/nav/Header';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';



function App() {
  return ( 
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
         <Route index element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route> 
          <Route path='/register/complete' element={<RegisterComplete />}></Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
