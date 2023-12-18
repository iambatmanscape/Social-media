import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from './App';
import Button from 'react-bootstrap/Button'
export default function Navbar() {
    const { account, setAccount } = useContext(DataContext);

    function logOut() {
        sessionStorage.removeItem('username');
    }
    return (<nav className = 'navbar'>
		<h2 className='navbar-header'>Social Media Clone</h2>
		{(!account)?<ul className='links'>
			<li><Link to='/Login' style={{textDecoration:'none'}}>Login</Link></li>
			<li><Link to='/' style={{textDecoration:'none'}}>Signup</Link></li>
		</ul>:<ul className='links'>
			<li>{`Hi ${account}`}</li>
			<li><Link to='/Login' style={{textDecoration:'none'}} onClick={logOut}>Log Out</Link></li>
		</ul>}
	</nav>)
}