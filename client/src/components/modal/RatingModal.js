import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const RatingModal = ({children}) => {
 const [modal,setModal] = useState(false)
 const {user} = useSelector((state) => state.auth)
 const navigate = useNavigate()

 const handleModal = () => {
    if(user && user.token){
        setModal(true)
    } else {
        navigate('/login')
    }
 }

  return (
    <>
        <div onClick={handleModal}>
            <StarOutlined className="text-danger" /> <br />{" "}
            {user ? 'Leave Rating' : 'Login to leave rating'}
        </div>
        <Modal
        title="Leave your rating"
        centered
        visible={modal}
        onOk={() => {
          setModal(false);
          toast.success("Thanks for your review. It will apper soon");
        }}
        onCancel={() => setModal(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default RatingModal
