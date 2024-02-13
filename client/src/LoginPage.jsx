import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import SI from './assets/signup-image.png'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { DataContext } from './App'

export default function Login() {
    const [statusText, setStatusText] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { account, setAccount } = useContext(DataContext);
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    async function onLogin() {
        const url = 'https://social-backend-dft5.onrender.com/login';
        const credentials = {
            username: username,
            password: password,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {

                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            sessionStorage.setItem('username', responseData.name)
            sessionStorage.setItem('id',responseData.id)
            navigate(`/Home`)


        } catch (error) {
            setStatusText("Invalid email or password")
            console.error('Error during login:', error.message);
        }


    }

    return ( <div className='form-container'>
        <div className='img-holder'>
             <img src={SI} className='form-img'/>
         </div>
        <form className='form'>
        <h2 className='form-header'>Login</h2>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setUsername(target.value)}/>
          <div className='input-panel'>
          <input className="auth-input"type={(showPassword)?'text':'password'} placeholder="Password" onChange={({target})=>setPassword(target.value)}/>
          {(showPassword)?
          <FaRegEye className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>:
          <FaRegEyeSlash className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>
          }
          </div>
          <Link className='text-center' to='/change-password'>Forgot Password</Link>
          <span className='stattext'>{statusText}</span>
          <button className='btn btn-primary' onClick={onLogin} type='button'>Log in</button>
        </form> <
        /div>)
    }