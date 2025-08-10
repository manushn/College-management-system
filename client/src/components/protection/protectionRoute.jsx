import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protectedroutes({ children }) {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem('Token');
  
  

  useEffect(() => {
    if(!isLoggedin){
    navigate('/login'); 
    return null;
  }
    
  }, [isLoggedin, navigate]);

  
  return isLoggedin ? children : null;
}

export default Protectedroutes;