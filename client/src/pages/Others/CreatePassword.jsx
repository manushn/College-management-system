import React, { useState } from 'react'
import HeadingTab from '../../components/HeadingTab'
import "./css/createpassword.css"
import { useNavigate } from 'react-router-dom';

function CreatePassword() {
    const [username,setusername]=useState("");
    const [otp,setotp]=useState("");
    const [password,setpassword]=useState("");
    const [Cpassword,setCpassword]=useState("");

    const [Isotp,setIsotp]=useState(true);
    const [Isloading,setIsloading]=useState(false);
    const [isresend,setisresend]=useState(true);
    const [sec,setsec]=useState(0);

    const navigate =useNavigate();

  return (
    <>
    <HeadingTab/>
    <div className="Cpassword-main">
        <div className="Cpassword-form">
            <h2>Create Password</h2>
            <div className="Cpassword-form-data">
                <label>Username</label>
                <input 
                placeholder='Username'
                value={username}
                onChange={(e)=>(setusername(e.target.value.trim()))}
                />
                {Isotp&&(
                    <>
                        <label>OTP</label>
                        <input 
                        placeholder='OTP'
                        value={otp}
                        onChange={(e)=>{setotp(e.target.value.trim())}}
                        />
                        <div className="resend-otp">
                            {isresend?(
                            <>
                                <button className='Reotpbtn'>Resend OTP</button>
                            </>
                            ):(
                            <>
                                <p>Resend OTP in {sec} secounds</p>
                            </>
                            )}
                        </div>
                        

                        <label>Create Password</label>
                        <input 
                        placeholder='Create Password'
                        value={password}
                        onChange={(e)=>{setpassword(e.target.value.trim())}}
                        />
                        <label>Confirm Password</label>
                        <input
                        placeholder='Re enter Password'
                        value={Cpassword}
                        onChange={(e)=>{setCpassword(e.target.value.trim())}}
                        />

                    </>   
                )}
                <button className='submit-btn'>Submit</button>
                <button className='Back-to-login' onClick={(e)=>{navigate("/login")}}>Back to login</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default CreatePassword
