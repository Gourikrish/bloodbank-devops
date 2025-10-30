import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const DonorDashboard = () => {
    const [donorData, setDonorData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/donor/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        .then(response => {
            if (response.status !== 200) {
                alert("You are not authorized to view this page");
                window.location.href = '/';
            }
        })
        .catch(() => {
            alert("Error verifying authorization");
            window.location.href = '/';
        });

        // Load donor data from localStorage
        const storedData = localStorage.getItem('donorData');
        if (storedData) {
            setDonorData(JSON.parse(storedData));
        }
    }, []);

    const getBloodGroupBadge = (bloodGroup) => {
        const colors = {
            'A+': 'danger',
            'A-': 'warning',
            'B+': 'primary',
            'B-': 'info',
            'AB+': 'success',
            'AB-': 'secondary',
            'O+': 'dark',
            'O-': 'light'
        };
        return colors[bloodGroup] || 'secondary';
    };

    if (!donorData) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="display-4 fw-bold text-success">
                            <i className="bi bi-heart-pulse me-3"></i>
                            Donor Dashboard
                        </h1>
                        <p className="lead text-muted">Welcome back, {donorData.name}!</p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h5 className="card-title mb-3">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    Personal Information
                                </h5>
                                <div className="mb-2">
                                    <strong>Name:</strong> {donorData.name}
                                </div>
                                <div className="mb-2">
                                    <strong>Email:</strong> {donorData.email}
                                </div>
                                <div className="mb-2">
                                    <strong>CNIC:</strong> {donorData.CNIC}
                                </div>
                                <div className="mb-2">
                                    <strong>Phone:</strong> {donorData.phoneNumber}
                                </div>
                                <div className="mb-2">
                                    <strong>City:</strong> {donorData.city}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100 text-white bg-danger">
                            <Card.Body className="text-center d-flex flex-column justify-content-center">
                                <i className="bi bi-droplet-fill display-1 mb-3"></i>
                                <h5 className="card-title">Your Blood Group</h5>
                                <h1 className="display-3 fw-bold">{donorData.bloodGroup}</h1>
                                <p className="mt-2">Universal {donorData.bloodGroup === 'O-' ? 'Donor' : donorData.bloodGroup === 'AB+' ? 'Recipient' : 'Type'}</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h5 className="card-title mb-3">
                                    <i className="bi bi-info-circle me-2 text-info"></i>
                                    Donation Eligibility
                                </h5>
                                <div className="mb-3">
                                    <Badge bg="success" className="w-100 py-2 mb-2">
                                        <i className="bi bi-check-circle me-1"></i> Eligible to Donate
                                    </Badge>
                                </div>
                                <div className="small text-muted">
                                    <p className="mb-1"><strong>Requirements:</strong></p>
                                    <ul className="mb-0">
                                        <li>Age: 18-65 years</li>
                                        <li>Weight: Above 50kg</li>
                                        <li>Healthy & well-rested</li>
                                        <li>No recent illness</li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="card-title">
                                    <i className="bi bi-calendar-check me-2 text-success"></i>
                                    Donation History
                                </h5>
                                <p className="text-muted">Your past blood donations will appear here.</p>
                                <div className="text-center py-3">
                                    <i className="bi bi-inbox display-4 text-muted"></i>
                                    <p className="text-muted mt-2">No donations recorded yet</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="card-title">
                                    <i className="bi bi-award me-2 text-warning"></i>
                                    Impact Statistics
                                </h5>
                                <Row className="text-center mt-3">
                                    <Col xs={4}>
                                        <div className="display-6 fw-bold text-primary">0</div>
                                        <small className="text-muted">Donations</small>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="display-6 fw-bold text-danger">0</div>
                                        <small className="text-muted">Lives Saved</small>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="display-6 fw-bold text-success">0ml</div>
                                        <small className="text-muted">Total Blood</small>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DonorDashboard;
