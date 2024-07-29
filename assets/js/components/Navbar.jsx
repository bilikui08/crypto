import React from 'react';
import { Container, Nav, Navbar as BNavbar, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate, Navigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt, faUser, faMoneyBillTransfer, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', false);
        // todo: request a /logout
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <>
            <BNavbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link className="navbar-brand" to="/">Crypto App</Link>
                    <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon icon={faHome} />&nbsp;Home
                            </Link>
                            <Link className="nav-link" to="/deposits">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} />&nbsp;Deposits
                            </Link>
                            <Link className="nav-link" to="/withdrawals">
                            <FontAwesomeIcon icon={faMoneyBill} />&nbsp;Withdrawals
                            </Link>
                        </Nav>
                    </BNavbar.Collapse>
                    <DropdownButton title="User" id="bg-nested-dropdown">
                        <Dropdown.Item onClick={handleProfile}>
                            <FontAwesomeIcon icon={faUser} />&nbsp;Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />&nbsp;Logout
                        </Dropdown.Item>
                    </DropdownButton>
                </Container>
            </BNavbar>
        </>
    )
}