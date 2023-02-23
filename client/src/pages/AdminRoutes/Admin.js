import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'


const Admin = () => {
  
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">
         AdminPage
         
        </div>
    </div>
  </div>
  )
}

export default Admin
