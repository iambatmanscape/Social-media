import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './App';
import Button from 'react-bootstrap/Button'
import Logo from './assets/Main-logo.jpg'
export default function Navbar() {
    const { account, setAccount,isLoggedIn,setIsLoggedIn } = useContext(DataContext);
    const [username,setUsername] = useState('')

    function logOut() {
    	setIsLoggedIn(false)
        sessionStorage.clear()
    }
    
    async function getinfo(userid) {
    	const options = {
    		method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userid:userid})
    	}
    	try {
    		const info = await fetch('https://4794-123-136-252-137.ngrok-free.app/user',options)
    		if(info) {
    			return info;
    		} 
    	} catch(e) {
    			console.log(e)
    		}
    }


   useEffect(()=>{
   	 const data = getinfo(account.id);
   	 setUsername(data.username)
     setIsLoggedIn(()=>JSON.parse(sessionStorage.getItem('isloggedin')) || false)


   },[account])

    return (<nav className = 'navbar'>
		<h2 className='navbar-header'><img src={Logo}/></h2>
		{(!isLoggedIn)?<ul className='links'>
			<li><Link to='/Login' style={{textDecoration:'none'}}>Login</Link></li>
			<li><Link to='/' style={{textDecoration:'none'}}>Signup</Link></li>
		</ul>:<ul className='links'>
		    <li><Link to='/home' style={{textDecoration:'none'}}>Home</Link></li>
			<li><Link to='/profile' style={{textDecoration:'none'}}>{username}</Link></li>
			<li><Link to='/Login' style={{textDecoration:'none'}} onClick={logOut}>Log Out</Link></li>
		</ul>}
	</nav>)
}