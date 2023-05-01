import React, { useState } from 'react'
import { Menu, Badge  } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    ShoppingCartOutlined,
  } from "@ant-design/icons";
import { auth } from "../../firebase";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/compat/app'
import Search from '../Search';

const { SubMenu, Item } = Menu;


const Header = () => {
  const {user} = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  //console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const [current, setCurrent] = useState("home");

 const lodoutUser = async () => {
  firebase.auth().signOut();
  dispatch(loginUser(null))
  localStorage.removeItem('token')
  navigate('/login')   
 }
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
    {user && <Item key="home" icon={<AppstoreOutlined />}>
     <Link to='/'>Home</Link>
    </Item>
    }
    
    <SubMenu icon={<SettingOutlined />} title="Username">
      {user && user.role == 'admin' &&
        <Item>
          <Link to='/admin/dashboard'>
            Dashboard
          </Link>
        </Item>
      }

{user && user.role == 'subscriber' &&
        <Item>
          <Link to='/user/history'>
            Dashboard
          </Link>
        </Item>
      }
      
    <Item  onClick={lodoutUser}>Logout</Item>
    </SubMenu>
   
    <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      <Item key="cart" onClick={lodoutUser} >
       Logout
      </Item>

    {!user && <Item key="register" icon={<UserAddOutlined />} className="float-right">
      <Link to='/register'> Register</Link>
      </Item>}
      
    {!user && <Item key="login" icon={<UserOutlined />} className="float-right">
      <Link to='/login'>Login</Link>
      </Item>}
      
   
    
      <Search />
    
  </Menu>
  )
}

export default Header
