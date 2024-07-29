import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './js/views/Home';
import Deposit from './js/views/Deposit';
import Withdrawal from './js/views/Withdrawal';
import Profile from './js/views/Profile';
import Login from './js/views/Login';
import Layout from './js/components/Layout';
import AuthService from './js/services/Auth';
import UserService from './js/services/User';

export default function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/deposits" element={<Deposit />} />
                    <Route path="/withdrawals" element={<Withdrawal /> } />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}