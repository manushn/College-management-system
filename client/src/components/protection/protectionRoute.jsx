import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protectedroutes({ children }) {
  const navigate = useNavigate();
  const isLoggedin = sessionStorage.getItem("isLoggedin")
  const isToken=sessionStorage.getItem('Token');
  
  

  useEffect(() => {
    if(!isLoggedin){
      
        navigate('/login'); 
        return ; 
  }
   if(!isToken){
      navigate("/login");
      return;
   }
    
  }, [isLoggedin, navigate]);

  
  return isLoggedin ? children : null;
}

export default Protectedroutes;