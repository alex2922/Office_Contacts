import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [data , setData] = useState({
        username: '',
        password: '',
        visible: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo purposes, we'll just set a dummy token
        // In a real app, you would validate credentials with your backend
        localStorage.setItem("token", "dummy-token");
        navigate("/dashboard");
    }
  return (
    <div className='parent h-screen'>
        <div className="child flex items-center justify-center">

                <form onSubmit={handleSubmit}   className="card flex flex-col gap-4 items-center w-[350px]">
                    <h2 className='text-4xl font-bold text-center mb-2'>Login</h2>

                    <input type="text" placeholder='Username' 
                    name='username'
                    value={data.username}
                    onChange={handleChange}
                    className='w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] ' />

                    <div className='w-full flex items-center gap-4'>
                    <input type={data.visible ? 'text' : 'password'} placeholder='Password' 
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    className='w-full p-2 rounded-md border border-2 border-[var(--border)] outline-none  focus:border-[var(--accent)] ' />

                    <button
                    className='cursor-pointer rounded-md border border-2 border-[var(--border)] h-full p-3 hover:bg-[var(--accent)] transition-all duration-300'
                    onClick={() => setData({...data, visible: !data.visible})}>{data.visible ? <FaRegEyeSlash/> : <FaRegEye/>}</button>
                    </div>

                    <button type='submit' className='btn !w-full'>Login</button>
                </form>



        </div>
    </div>
  )
}

export default Login