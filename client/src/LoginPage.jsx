import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import prof from './assets/img_avatar2.jpg'
import { DataContext } from './App'
export default function Login() {
    const [statusText, setStatusText] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { account, setAccount } = useContext(DataContext);
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
            navigate(`/Home`)


        } catch (error) {
            setStatusText("Invalid email or password")
            console.error('Error during login:', error.message);
        }


    }

    return ( < >
        <form className='form'>
          <div className='image-container'>
            <img src={prof} className='prof-img'/>
          </div>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setUsername(target.value)}/>
          <input className="auth-input"type="password" placeholder="password"  onChange={({target})=>setPassword(target.value)}/>
          <Link className='text-center' to='/change-password'>Forgot Password</Link>
          <span className='stattext'>{statusText}</span>
          <button className='btn btn-primary' onClick={onLogin} type='button'>Log in</button>
        </form> <
        />)
    }