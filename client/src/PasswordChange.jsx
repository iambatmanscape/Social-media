import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SI from './assets/signup-image.png'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import { DataContext } from './App'
export default function PasswordChange() {
    
    const [statusText, setStatusText] = useState('')
    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()
    const url = 'https://social-backend-dft5.onrender.com/login/change';
    async function changePassword() {
        const obj = {
            username: username,
            password: newPassword,
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }
        try {
            const response = await fetch(url, options);
            const back = await response.json()
            navigate('/Login')

        } catch (e) {
            console.log("Error during password change")
        }
    }
    

    return ( <div className='form-container'>
        <div className='img-holder'>
             <img src={SI}/>
         </div>
        <form className='form'>
        <h2 className='form-header'>Change Password</h2>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setUsername(target.value)}/>
          <div className='input-panel'>
          <input className="auth-input"type={(showPassword)?'text':'password'} placeholder="New Password" onChange={({target})=>setNewPassword(target.value)}/>
          {(showPassword)?
          <FaRegEye className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>:
          <FaRegEyeSlash className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>
          }
          </div>
          <span className='stattext'>{statusText}</span>
          <button className='btn btn-primary' onClick={changePassword} type='button'>Change Password</button>
        </form> <
        /div>)




    }