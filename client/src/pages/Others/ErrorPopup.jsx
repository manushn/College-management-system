import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import "./css/errorpopup.css"
function ErrorPopup({emessage,duration=4000,onClose}) {

    useEffect(() => {
    if (emessage) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [emessage, duration, onClose]);

  if (!emessage) return null;


  return (
    <div className="emesaage-mains">
        <div className="emessage-cons">
          <p>{emessage}</p>
        </div>
      </div>
  )
}

export default ErrorPopup
