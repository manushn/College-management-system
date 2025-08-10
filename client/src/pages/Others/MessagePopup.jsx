import React, { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import "./css/errorpopup.css"
function MessagePopup({message,duration=4000,onClose}) {

    useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;


  return (
    <div className="mesaage-mains">
        <div className="message-cons">
          <p>{message}</p>
        </div>
      </div>
  )
}

export default MessagePopup;
