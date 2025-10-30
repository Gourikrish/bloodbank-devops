import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const isLoggedIn = localStorage.getItem('token');

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <i className="bi bi-droplet-fill text-danger me-2"></i>
                    Blood Bank Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">
                            <i className="bi bi-house-door me-1"></i>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/search-blood">
                            <i className="bi bi-search-heart me-1 text-danger"></i>
                            Search Blood
                        </Nav.Link>
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link href="/admin/login">
                                    <i className="bi bi-shield-lock me-1"></i>
                                    Admin Login
                                </Nav.Link>
                                <Nav.Link href="/donor/login">
                                    <i className="bi bi-person me-1"></i>
                                    Donor Login
                                </Nav.Link>
                                <Nav.Link href="/donor/signup">
                                    <i className="bi bi-person-plus me-1"></i>
                                    Donor Signup
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-1"></i>
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
