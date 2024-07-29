import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';
import AuthService from '../services/Auth';
import UserService from '../services/User';


export default function Profile() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
 
    useEffect(() => {

        if(!AuthService.isLoggedIn()){
            navigate("/login");
        } else {
            const params = {
                'email': 'gustavo639@gmail.com'
            };

            UserService.get(params);    
        }
    },[])

    return (
        <>
            <p>Bienvenido Profile</p>
        </>
    )
}