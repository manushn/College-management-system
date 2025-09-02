import React from 'react'

function AccountantHome() {
    const navigate=useNavigate();
    const Role=sessionStorage.getItem('role');
    useEffect(()=>{
      
      if(Role!=='accoundant'){
        alert("Invalid Access Dedected Redirecting...")
        
        localStorage.removeItem("Token");
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('isLoggedin')
        navigate("/login", { replace: true });
      }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AccountantHome
