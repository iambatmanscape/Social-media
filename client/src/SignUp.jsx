import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SI from './assets/signup-image.png';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
export default function SignUp() {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword,setShowPassword] = useState(false)
    const [statusText,setStatusText] = useState('')
    async function SUp() {
        const url = 'https://social-backend-dft5.onrender.com/signup';
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
    function validation() {
        if(name==='') {
            setStatusText('Fields cannot be empty!')
            throw new Error('Fields cannot be empty!')
        }
        if(mail==='') {
            setStatusText('Fields cannot be empty!')
            throw new Error('Fields cannot be empty!')
        }
        if(pass==='') {
            setStatusText('Fields cannot be empty!')
            throw new Error('Fields cannot be empty!')
        }
    }
    return ( <div className='form-container' >
         <div className='img-holder'>
             <img src={SI} className='form-img'/>
         </div>
        <form className='form'>
          <h2 className='form-header'>Sign up</h2>
          <input className="auth-input"type="text" placeholder="Username" onChange={({target})=>setName(target.value)} required/>
          <input className="auth-input"type="email" placeholder="Email" required onChange={({target})=>setMail(target.value)} required/>
          <div className='input-panel'>
          <input className="auth-input"type={(showPassword)?'text':'password'} placeholder="Password" required onChange={({target})=>setPass(target.value)} required/>
          {(showPassword)?
          <FaRegEye className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>:
          <FaRegEyeSlash className='eyecon' onClick={()=>setShowPassword(prev=>prev=!prev)}/>
          }
          </div>
          <span className='stattext'>{statusText}</span>
          <button type='button' className='btn btn-primary' onClick={()=>{
            validation();
            SUp()
          }}>Sign-Up</button>
        </form> <
        /div>)
    }