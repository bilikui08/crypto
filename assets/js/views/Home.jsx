import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';
import AuthService from '../services/Auth';
import UserService from '../services/User';


export default function Home() {

    return (
        <>
            <p>Bienvenido a la Home</p>
        </>
    )
}