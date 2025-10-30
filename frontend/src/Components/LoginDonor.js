import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const LoginDonor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/donor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                toast.success('Login Successful! Redirecting...', {
                    position: "top-right",
                    autoClose: 2000,
                });
                localStorage.setItem('token', data.token);
                localStorage.setItem('donorData', JSON.stringify(data.donor));
                setTimeout(() => {
                    window.location.href = '/donor/dashboard';
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Invalid Credentials', {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log("Error occurred while logging in", error);
            toast.error('Network error. Please try again.', {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        window.location.href = '/donor/signup';
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={5}>
                        <Card className="shadow">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <i className="bi bi-person-check display-1 text-success"></i>
                                    <h2 className="fw-bold mt-3">Donor Login</h2>
                                    <p className="text-muted">Access your donor dashboard</p>
                                </div>

                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>
                                            <i className="bi bi-envelope me-2"></i>
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Label>
                                            <i className="bi bi-lock me-2"></i>
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="success"
                                            size="lg"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                                    Login
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleSignup}
                                        >
                                            <i className="bi bi-person-plus me-2"></i>
                                            Register as Donor
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default LoginDonor;
