import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function StaffHome() {
  const navigate=useNavigate();
    const Role=sessionStorage.getItem('role');
    useEffect(()=>{
      
      if(Role!=='staff'){
        alert("Invalid Access Dedected Redirecting...")
        
        localStorage.removeItem("Token");
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('isLoggedin')
        navigate("/login", { replace: true });
      }
    },[])

  return (
    <div>
      <h1>Staff Home</h1>
    </div>
  )
}

export default StaffHome
