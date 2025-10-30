import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const SignupDonor = () => {
    const [name, setName] = useState('');
    const [CNIC, setCnic] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [loading, setLoading] = useState(false);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);

        const userData = {
            name,
            CNIC,
            phone,
            email,
            password,
            city,
            bloodGroup
        };

        try {
            const response = await fetch('http://localhost:4000/donor/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.status === 200) {
                toast.success('Account created successfully! Redirecting to login...', {
                    position: "top-right",
                    autoClose: 2000,
                });
                setTimeout(() => {
                    window.location.href = '/donor/login';
                }, 2000);
            } else {
                toast.error('Error occurred. Account may already exist.', {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log("Error occurred while signing up", error);
            toast.error('Network error. Please try again.', {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        window.location.href = '/';
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="shadow">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <i className="bi bi-person-plus display-1 text-danger"></i>
                                    <h2 className="fw-bold mt-3">Donor Registration</h2>
                                    <p className="text-muted">Register to become a blood donor and save lives</p>
                                </div>

                                <Form onSubmit={handleSignup}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label>
                                                    <i className="bi bi-person me-2"></i>
                                                    Full Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formCNIC">
                                                <Form.Label>
                                                    <i className="bi bi-card-text me-2"></i>
                                                    CNIC
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="12345-1234567-1"
                                                    pattern="\d{5}-\d{7}-\d"
                                                    value={CNIC}
                                                    onChange={(e) => setCnic(e.target.value)}
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    Format: 12345-1234567-1
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formPhone">
                                                <Form.Label>
                                                    <i className="bi bi-telephone me-2"></i>
                                                    Phone Number
                                                </Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    placeholder="0300123456"
                                                    pattern="^\d{10}$"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                                <Form.Text className="text-muted">
                                                    10 digits without dashes
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
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
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formPassword">
                                                <Form.Label>
                                                    <i className="bi bi-lock me-2"></i>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="formCity">
                                                <Form.Label>
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    City
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter your city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4" controlId="formBloodGroup">
                                                <Form.Label>
                                                    <i className="bi bi-droplet-fill text-danger me-2"></i>
                                                    Blood Group
                                                </Form.Label>
                                                <Form.Select
                                                    value={bloodGroup}
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select your blood group</option>
                                                    {bloodGroups.map((group) => (
                                                        <option key={group} value={group}>
                                                            {group}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="danger"
                                            size="lg"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-check me-2"></i>
                                                    Register as Donor
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleBack}
                                        >
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Back to Home
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

export default SignupDonor;
