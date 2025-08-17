import React, { useState, useEffect } from 'react'
import axios from "axios";
import HeadingTab from '../../components/heading/HeadingTab'
import "./css/createpassword.css"
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import MessagePopup from "./MessagePopup";

function CreatePassword() {
    const [username, setusername] = useState("");
    const [otp, setotp] = useState("");
    const [password, setpassword] = useState("");
    const [Cpassword, setCpassword] = useState("");

    const [Isotp, setIsotp] = useState(false);
    const [Isloading, setIsloading] = useState(false);
    const [isresend, setisresend] = useState(true);
    const [sec, setsec] = useState(0);
    const [Emessage, setEmessage] = useState("");
    const [Message, setMessage] = useState("");

    const navigate = useNavigate();

    
    useEffect(() => {
        let interval = null;
        
        if (sec > 0) {
            interval = setInterval(() => {
                setsec(seconds => {
                    if (seconds <= 1) {
                        setisresend(true); 
                        return 0;
                    }
                    return seconds - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        
        return () => clearInterval(interval);
    }, [sec]);

    useEffect(() => {
        if (Message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [Message]);

    
    useEffect(() => {
        if (Emessage) {
            const timer = setTimeout(() => {
                setEmessage("");
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [Emessage]);

    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        setsec(60);
        setisresend(false); 
    };


    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        if (password.length < minLength) {
            return "Password must be at least 6 characters long!";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter!";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character (!@#$%^&*...)!";
        }
        return null; 
    };



    const createOtp = async () => {
        if (Isloading) return;

        try {
            setIsloading(true);
            setEmessage(""); 
            setMessage(""); 

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createotp`,
                { username: username }
            );
            
            if (response.data.emessage) {
                setEmessage(response.data.emessage);
            }

            if (response.data.isOtp) {
                setIsotp(true);
                setMessage("OTP sent to registered Email.");
                startTimer(); 
            }

        } catch (err) {
            console.log(err);
            setEmessage("Failed to send OTP. Please try again.");
        } finally {
            setIsloading(false);
        }
    };

    const verifyOtp = async () => {
        if (Isloading) return;

        try {
            setIsloading(true);
            setEmessage(""); 

            if (password !== Cpassword) {
                setEmessage("Password does not match!");
                return;
            }

            const passwordError = validatePassword(password);
            if (passwordError) {
                setEmessage(passwordError);
                return;
            }


            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/verifyotp`,
                { username: username, otp: otp, password: Cpassword }
            );
            
            if (response.data.emessage) {
                setEmessage(response.data.emessage);
            }
            
            if (response.data.success) {
                setMessage("Password created successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }

        } catch (err) {
            console.log(err);
            setEmessage("Failed to verify OTP. Please try again.");
        } finally {
            setIsloading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!isresend || Isloading) return;
        
        try {
            setIsloading(true);
            setEmessage("");
            setMessage("");

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createotp`,
                { username: username }
            );
            
            if (response.data.emessage) {
                setEmessage(response.data.emessage);
            }

            if (response.data.isOtp) {
                setMessage("OTP resent to registered Email.");
                startTimer();
            }

        } catch (err) {
            console.log(err);
            setEmessage("Failed to resend OTP. Please try again.");
        } finally {
            setIsloading(false);
        }
    };

    const handleCreation = async () => {
        if (Isotp) {
            verifyOtp();
        } else {
            createOtp();
        }
    };

    return (
        <>
            <HeadingTab />
            <div className="Cpassword-main">
                <div className="Cpassword-form">
                    <h2>Create Password</h2>
                    <div className="Cpassword-form-data">
                      
                        <label>Username</label>
                        <input 
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setusername(e.target.value.trim())}
                            disabled={Isotp} 
                        />
                        
                        {Isotp && (
                            <>
                                <label>OTP</label>
                                <input 
                                    placeholder='Enter 6-digit OTP'
                                    value={otp}
                                    maxLength="6"
                                    onChange={(e) => setotp(e.target.value.trim())}
                                />
                                
                                <div className="resend-otp">
                                    {isresend ? (
                                        <button 
                                            className='Reotpbtn' 
                                            onClick={handleResendOtp}
                                            disabled={Isloading}
                                        >
                                            {Isloading ? 'Sending...' : 'Resend OTP'}
                                        </button>
                                    ) : (
                                        <p style={{ color: '#666', fontSize: '14px' }}>
                                            Resend OTP in {formatTime(sec)}
                                        </p>
                                    )}
                                </div>

                                <label>Create Password</label>
                                <input 
                                    type="password"
                                    placeholder='Create Password (min 6 characters)'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value.trim())}
                                />
                                
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder='Re-enter Password'
                                    value={Cpassword}
                                    onChange={(e) => setCpassword(e.target.value.trim())}
                                />
                            </>   
                        )}
                        
                        <button 
                            className='submit-btn' 
                            onClick={handleCreation}
                            disabled={Isloading || (!username.trim()) || (Isotp && (!otp.trim() || !password.trim() || !Cpassword.trim()))}
                        >
                            {Isloading ? 'Processing...' : (Isotp ? 'Create Password' : 'Send OTP')}
                        </button>
                        
                        <button 
                            className='Back-to-login' 
                            onClick={() => navigate("/login")}
                        >
                            Back to login
                        </button>
                    </div>
                </div>
            </div>
            <ErrorPopup
            emessage={Emessage}
            onClose={()=>setEmessage("")}
            />
            <MessagePopup
            message={Message}
            onClose={()=>setMessage("")}
            />
            
        </>
    )
}

export default CreatePassword