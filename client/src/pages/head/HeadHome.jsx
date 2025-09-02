import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HeadHome() {
  const navigate=useNavigate();
    const Role=sessionStorage.getItem('role');
    useEffect(()=>{
      console.log("Checking")
      if(Role!=='head'){
        alert("Invalid Access Dedected Redirecting...")
        
        localStorage.removeItem("Token");
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('isLoggedin')
        navigate("/login", { replace: true });
      }
    },[])
  return (
    <div>
      <h1>Head Page</h1>
    </div>
  )
}

export default HeadHome
