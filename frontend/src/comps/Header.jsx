import React from 'react'
import { Link, useNavigate } from 'react-router-dom';







const Header = (props) => {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  




  return (
    <div className='py-4 border-b w-full border-[var(--border)] flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>{props.title}</h2>

     <div className='flex gap-4'>
     <Link to={props.link} className="btn2" >{props.btnText}</Link>
     <button className="btn" onClick={handleLogout}>Logout</button>
     </div>
    </div>
  )
}

export default Header
