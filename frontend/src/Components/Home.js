import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
    const handleLoginAdmin = () => {
        window.location.href = '/admin/login';
    };

    const handleSignupAsDonor = () => {
        window.location.href = '/donor/signup';
    };

    const handleLoginAsDonor = () => {
        window.location.href = '/donor/login';
    };

    const handleSearchBlood = () => {
        window.location.href = '/search-blood';
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="text-center mb-5">
                    <Col>
                        <h1 className="display-4 fw-bold text-danger mb-3">
                            <i className="bi bi-heart-pulse-fill me-3"></i>
                            Welcome to Blood Bank Management System
                        </h1>
                        <p className="lead text-muted">
                            Save lives by donating blood. Every donation counts!
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={6} lg={3}>
                        <Card className="h-100 shadow-sm hover-card">
                            <Card.Body className="text-center d-flex flex-column">
                                <div className="mb-3">
                                    <i className="bi bi-shield-check display-1 text-primary"></i>
                                </div>
                                <Card.Title className="fw-bold">Admin Portal</Card.Title>
                                <Card.Text className="flex-grow-1 text-muted">
                                    Manage donors, track blood inventory, and oversee operations
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={handleLoginAdmin}
                                    className="mt-auto"
                                >
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login as Admin
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3}>
                        <Card className="h-100 shadow-sm hover-card">
                            <Card.Body className="text-center d-flex flex-column">
                                <div className="mb-3">
                                    <i className="bi bi-person-check display-1 text-success"></i>
                                </div>
                                <Card.Title className="fw-bold">Donor Login</Card.Title>
                                <Card.Text className="flex-grow-1 text-muted">
                                    Access your donor account and view your donation history
                                </Card.Text>
                                <Button
                                    variant="success"
                                    onClick={handleLoginAsDonor}
                                    className="mt-auto"
                                >
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login as Donor
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3}>
                        <Card className="h-100 shadow-sm hover-card">
                            <Card.Body className="text-center d-flex flex-column">
                                <div className="mb-3">
                                    <i className="bi bi-person-plus display-1 text-danger"></i>
                                </div>
                                <Card.Title className="fw-bold">New Donor</Card.Title>
                                <Card.Text className="flex-grow-1 text-muted">
                                    Register as a blood donor and start saving lives today
                                </Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={handleSignupAsDonor}
                                    className="mt-auto"
                                >
                                    <i className="bi bi-person-plus me-2"></i>
                                    Register as Donor
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3}>
                        <Card className="h-100 shadow-sm hover-card border-warning">
                            <Card.Body className="text-center d-flex flex-column">
                                <div className="mb-3">
                                    <i className="bi bi-search-heart display-1 text-warning"></i>
                                </div>
                                <Card.Title className="fw-bold">Need Blood?</Card.Title>
                                <Card.Text className="flex-grow-1 text-muted">
                                    Search for blood donors by type and location in your area
                                </Card.Text>
                                <Button
                                    variant="warning"
                                    onClick={handleSearchBlood}
                                    className="mt-auto"
                                >
                                    <i className="bi bi-search me-2"></i>
                                    Search Blood
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <Card className="bg-danger text-white shadow">
                            <Card.Body className="text-center py-4">
                                <h3 className="mb-3">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    Blood Donation Facts
                                </h3>
                                <Row>
                                    <Col md={3}>
                                        <h2 className="fw-bold">38%</h2>
                                        <p className="small">Eligible to donate</p>
                                    </Col>
                                    <Col md={3}>
                                        <h2 className="fw-bold">1 in 7</h2>
                                        <p className="small">People need blood</p>
                                    </Col>
                                    <Col md={3}>
                                        <h2 className="fw-bold">450ml</h2>
                                        <p className="small">Per donation</p>
                                    </Col>
                                    <Col md={3}>
                                        <h2 className="fw-bold">56 days</h2>
                                        <p className="small">Between donations</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .hover-card {
                    transition: transform 0.2s;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                }
            `}</style>
        </div>
    );
};

export default Home;
