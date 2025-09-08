import React, { useEffect, useState } from 'react'
import HeadingTab from '../../components/heading/HeadingTab'
import Admindash from '../../components/Admin/admin-dashboard/Admindash'
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate=useNavigate();
  const Role=sessionStorage.getItem('role');
  useEffect(()=>{
    
    if(Role!=='admin'){
      alert("Invalid Access Dedected Redirecting...")
      
      sessionStorage.removeItem("Token");;
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('isLoggedin')
      navigate("/login", { replace: true });
    }
  },[])
  return (
    <div>
      <HeadingTab/>
      <Admindash/>
      
    </div>
  )
}

export default AdminHome
