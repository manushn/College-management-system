import React, { useState,useEffect } from 'react'
import HeadingTab from '../../components/heading/HeadingTab'
import "./css/loginpage.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Loginpages() {

    const navigate=useNavigate();
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [Emessage,setEmessage]=useState("");

    const [Isloading,setIsloading]=useState(false);



    useEffect(() => {
        if (Emessage) {
            const timer = setTimeout(() => {
                setEmessage("");
            }, 4000); 

            return () => clearTimeout(timer);
        }
    }, [Emessage]);

useEffect(()=>{

  const autologin=async()=>{
    try{
      const Token=localStorage.getItem("Token");

      if(!Token) return;

      const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/autologin`,
          {Token},
          {
            headers: {
              Authorization: `Bearer ${Token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      
      if(response.data.success){
         localStorage.setItem("Token",response.data.Token);
        navigate("/admin-home");
      }

      


    }catch(error){
      console.log(error)
    }finally{setIsloading(false)}
  }
  autologin()

},[location.pathname])

    
    

      const handleLogin = async(e)=>{
       e.preventDefault();
       if(!username||!password) setEmessage("Enter all field ")
       
        try{
          setIsloading(true);
        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
          {username,password}
        );

        if(response.data.emessage){
          setEmessage(response.data.emessage);

        }

        if(response.data.success){
          localStorage.setItem("Token",response.data.token);
          localStorage.setItem("Role",response.data.role);
          navigate("/admin-home");
        }

    }catch(err){
      console.log("Error in Login:",err)
    }finally{
      setIsloading(false)
    };
    }


  return (
    <>
    <HeadingTab/>
    <div className="loginpage-main">
        <div className="loginform">
            <h1>Welcome Back</h1>
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                type="text"
                value={username}
                placeholder='Username'
                onChange={(e)=>{setusername(e.target.value.trim())}}
                />
                <label>Password</label>
                <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{setpassword(e.target.value.trim())}}
                />
                <p onClick={()=>{navigate("/create-password")}}>Create New Password</p>
                <button type='submit'>{Isloading?('Loging...'):('Login')}</button>

            </form>
        </div>
    </div>
    {Emessage&&(
      <>
      <div className="emesaage-main">
        <div className="emessage-con">
          <p>{Emessage}</p>
        </div>
      </div>
      </>
    )}
    </>
  )
}

export default Loginpages
