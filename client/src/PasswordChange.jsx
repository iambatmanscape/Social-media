import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import prof from './assets/img_avatar2.jpg'
export default function PasswordChange() {
    const url = 'http://localhost:3000/login/change';
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [newPassword, setNewPassword] = useState('');
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

    return ( < >
        <form className='form'>
          <div className='image-container'>
            <img src={prof} className='prof-img'/>
          </div>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setUsername(target.value)}/>
          <input className="auth-input"type="password" placeholder="new password"  onChange={({target})=>setNewPassword(target.value)}/>
          <button className='btn btn-primary' type='button' onClick={changePassword}>Change Password</button>
        </form> <
        />)
    }