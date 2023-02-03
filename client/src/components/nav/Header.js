import React, { useState } from 'react'
import { Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
  } from "@ant-design/icons";
 import { auth } from "../../firebase";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/compat/app'
  const { SubMenu, Item } = Menu;
  

const Header = () => {
  const {user} = useSelector((state) => state.auth)
  //console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const [current, setCurrent] = useState("home");

 const lodoutUser = async () => {
  firebase.auth().signOut();
  dispatch(loginUser(null))
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
    
    {user &&  <SubMenu icon={<SettingOutlined />} title="Username">
      <Item key="setting:1">Option 1</Item>
      <Item key="setting:2">Option 2</Item>
      <Item key="setting:3" onClick={lodoutUser}>Logout</Item>
    </SubMenu>}
   

    {!user && <Item key="register" icon={<UserAddOutlined />} className="float-right">
      <Link to='/register'> Register</Link>
      </Item>}
      
    {!user && <Item key="login" icon={<UserOutlined />} className="float-right">
      <Link to='/login'>Login</Link>
      </Item>}
      
   
    

    
  </Menu>
  )
}

export default Header
