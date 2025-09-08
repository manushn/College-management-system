import React from 'react'
import "./css/headingtab.css"
import { useNavigate } from 'react-router-dom';

function HeadingTab() {
const navigate =useNavigate();
const token=sessionStorage.getItem("Token");;

  return (
    <>
    <div className="headtab-body">
        <div className="headtab-left">
            <img src='nilogo.png' alt='image'/>
        </div>
        {
          token&&(
              <div className="headtab-right">
                  <button onClick={()=>{sessionStorage.removeItem("Token");;navigate("/login")}}>Logout</button>
              </div>
          )
        }
        
    </div>
    </>
  )
}

export default HeadingTab
