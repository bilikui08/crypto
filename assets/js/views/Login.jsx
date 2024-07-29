import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/Auth';

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (form.checkValidity()) {
            setIsDataLoading(true);
            
            const params = {
                email: document.getElementsByName('email')[0].value,
                password: document.getElementsByName('password')[0].value
            }

            const data = await AuthService.loginCheck(params);

            if (data.code == 401) {
                setShowAlertError(true);
                setErrorMessage(data.message);
                setIsDataLoading(false);
                return;
            }
        }

        setShowAlertError(false);
        setValidated(true);
        setIsDataLoading(false);

        if (AuthService.isLoggedIn()) {
            navigate("/");
        }
    };

    return (
        <>
            { showAlertError ? 
                <Alert key="danger" variant="danger">
                    {errorMessage}
                </Alert> : null
            }

            <h2>Login</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit} method='POST'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" disabled={isDataLoading} type="submit">
                    {isDataLoading ? <Spinner animation="border" size="sm" /> : null}
                    &nbsp;{isDataLoading ? "Loading..." : "Login"}
                </Button>
            </Form>
        </>
    );
}