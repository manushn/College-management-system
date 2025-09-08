import React from 'react'
import { useNavigate } from 'react-router-dom';

function StudentHome() {
    const navigate=useNavigate();
    const Role=sessionStorage.getItem('role');
    useEffect(()=>{
      
      if(Role!=='student'){
        alert("Invalid Access Dedected Redirecting...")
        
        sessionStorage.removeItem("Token");;
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('isLoggedin')
        navigate("/login", { replace: true });
      }
    },[])
  return (
    <div>
      <h1>Student page</h1>
    </div>
  )
}

export default StudentHome
