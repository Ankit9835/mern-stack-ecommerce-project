import { async } from "@firebase/util";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
import PasswordUpdateForm from "../../components/PasswordUpdateForm";
import {auth} from '../../firebase.js'
const Password =  () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const res = await auth.currentUser.updatePassword(password)
    setLoading(false)
    setPassword('')
    toast.success('Password updated successfully')
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          <PasswordUpdateForm
            loading={loading}
            setLoading={setLoading}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
