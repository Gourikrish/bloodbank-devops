import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/admin/verify', {
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
    }, []);

    const handleUpdate = () => {
        window.location.href = '/admin/update';
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="display-4 fw-bold text-primary">
                            <i className="bi bi-speedometer2 me-3"></i>
                            Admin Dashboard
                        </h1>
                        <p className="lead text-muted">Manage blood donors and system operations</p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body className="text-center">
                                <i className="bi bi-people display-1 text-primary mb-3"></i>
                                <Card.Title className="fw-bold">Manage Donors</Card.Title>
                                <Card.Text className="text-muted">
                                    View, update, and delete donor records
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={handleUpdate}
                                    className="mt-3"
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Manage Donors
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100 bg-primary text-white">
                            <Card.Body className="text-center">
                                <i className="bi bi-droplet-fill display-1 mb-3"></i>
                                <Card.Title className="fw-bold">Blood Inventory</Card.Title>
                                <Card.Text>
                                    Track blood types and availability
                                </Card.Text>
                                <Button
                                    variant="light"
                                    className="mt-3"
                                >
                                    <i className="bi bi-bar-chart me-2"></i>
                                    View Inventory
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body className="text-center">
                                <i className="bi bi-clipboard-data display-1 text-success mb-3"></i>
                                <Card.Title className="fw-bold">Reports</Card.Title>
                                <Card.Text className="text-muted">
                                    Generate donation and donor reports
                                </Card.Text>
                                <Button
                                    variant="success"
                                    className="mt-3"
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    View Reports
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="card-title mb-3">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Quick Actions
                                </h5>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button variant="outline-primary" size="sm">
                                        <i className="bi bi-person-plus me-1"></i>
                                        Add New Donor
                                    </Button>
                                    <Button variant="outline-success" size="sm">
                                        <i className="bi bi-check-circle me-1"></i>
                                        Approve Requests
                                    </Button>
                                    <Button variant="outline-warning" size="sm">
                                        <i className="bi bi-bell me-1"></i>
                                        Send Notifications
                                    </Button>
                                    <Button variant="outline-info" size="sm">
                                        <i className="bi bi-download me-1"></i>
                                        Export Data
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
