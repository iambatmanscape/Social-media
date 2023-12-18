import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import prof from './assets/img_avatar2.jpg'
export default function SignUp() {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    async function SUp() {
        const url = 'https://social-media-khaki.vercel.app/signup';
        const obj = {
            username: name,
            email: mail,
            password: pass,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(obj)
        }
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const responseData = await response.json();

            console.log('Successfull signup');
            Navigate('/Login')

        } catch (err) {
            console.log(err)
        }

    }
    return ( < >

        <form className='form'>
          <div className='image-container'>
            <img src={prof} className='prof-img'/>
          </div>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setName(target.value)} required/>
          <input className="auth-input"type="email" placeholder="Email" required onChange={({target})=>setMail(target.value)}/>
          <input className="auth-input"type="password" placeholder="Password" required onChange={({target})=>setPass(target.value)}/>
          <button type='button' className='btn btn-primary' onClick={SUp}>Sign-Up</button>
        </form> <
        />)
    }