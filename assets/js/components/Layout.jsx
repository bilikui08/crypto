import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

export default function Layout() {
    return (
        <>
            <Navbar />
            <Container fluid="sm">
                <Row>&nbsp;</Row>
                    <Row>
                        <Col md="4">&nbsp;</Col>
                        <Col md="4"><Outlet /></Col>
                    </Row>
            </Container>
        </>
    );
}
