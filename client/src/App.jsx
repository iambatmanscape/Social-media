import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import Login from './LoginPage';
import SignUp from './SignUp';
import Home from './Home';
import PasswordChange from './PasswordChange';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
export const DataContext = React.createContext();
export default function App() {
    const [account, setAccount] = useState(null)

    return ( < >
            <DataContext.Provider value={ {account,setAccount} }>
        <Navbar/> <
        Routes >
        <
        Route path = '/'
        element = { <SignUp/> }
        /> <
        Route path = '/Login'
        element = { <Login/> }
        />
        <Route path = '/change-password'
        element = { <PasswordChange/> }
        /> <
        Route path = '/Home'
        element = { <Home/> }
        />
         < /
        Routes >
        <
        /DataContext.Provider>
        </>
    )
}