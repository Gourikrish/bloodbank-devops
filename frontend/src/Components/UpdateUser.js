import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Badge, InputGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const UpdateUser = () => {
    const [donors, setDonors] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:4000/admin/retrieveAllDonors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setDonors(data.donors);
            } else if (response.status === 403) {
                toast.error('You are not authorized to perform this action');
                window.location.href = '/login';
            } else {
                toast.error('Error occurred while retrieving donors');
            }
        } catch (error) {
            console.log("Error occurred while retrieving donors", error);
            toast.error('Network error');
        }
    };

    const handleSearch = donors.filter((donor) => {
        return donor.name.toLowerCase().includes(searchItem.toLowerCase()) ||
               donor.email.toLowerCase().includes(searchItem.toLowerCase()) ||
               donor.bloodGroup.toLowerCase().includes(searchItem.toLowerCase());
    });

    const handleBack = () => {
        window.location.href = '/admin/dashboard';
    };

    const updateUserEnable = (donor) => {
        setSelectedDonor(donor);
        setName(donor.name);
        setCNIC(donor.CNIC);
        setPhoneNumber(donor.phoneNumber);
        setCity(donor.city);
        setBloodGroup(donor.bloodGroup);
        setShowModal(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/admin/updateDonor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    name: name,
                    CNIC: CNIC,
                    phoneNumber: phone,
                    email: selectedDonor.email,
                    city: city,
                    bloodGroup: bloodGroup,
                    password: selectedDonor.password
                })
            });

            if (response.status === 200) {
                toast.success('Donor updated successfully!');
                setShowModal(false);
                fetchDonors();
            } else {
                toast.error('Error occurred while updating donor');
            }
        } catch (error) {
            console.log("Error occurred while updating donor", error);
            toast.error('Network error');
        }
    };

    const deleteUser = async (email, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:4000/admin/deleteDonor', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ email: email })
                });

                if (response.status === 200) {
                    toast.success('Donor deleted successfully!');
                    fetchDonors();
                } else {
                    toast.error('Error occurred while deleting donor');
                }
            } catch (error) {
                console.log("Error occurred while deleting donor", error);
                toast.error('Network error');
            }
        }
    };

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

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="display-5 fw-bold text-primary">
                            <i className="bi bi-people me-3"></i>
                            Manage Donors
                        </h1>
                        <p className="text-muted">View, update, and manage blood donor records</p>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={6}>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search by name, email, or blood group..."
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} className="text-end">
                        <Button variant="secondary" onClick={handleBack}>
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Dashboard
                        </Button>
                    </Col>
                </Row>

                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="table-responsive">
                            <Table striped hover>
                                <thead className="table-primary">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                        <th>Blood Group</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {handleSearch.length > 0 ? (
                                        handleSearch.map((donor) => (
                                            <tr key={donor._id}>
                                                <td>{donor.name}</td>
                                                <td>{donor.email}</td>
                                                <td>{donor.phoneNumber}</td>
                                                <td>{donor.city}</td>
                                                <td>
                                                    <Badge bg={getBloodGroupBadge(donor.bloodGroup)}>
                                                        {donor.bloodGroup}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => updateUserEnable(donor)}
                                                    >
                                                        <i className="bi bi-pencil me-1"></i>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => deleteUser(donor.email, donor.name)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                <i className="bi bi-inbox display-4 text-muted"></i>
                                                <p className="text-muted mt-2">No donors found</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div className="mt-3 text-muted">
                            <small>Total Donors: {donors.length} | Showing: {handleSearch.length}</small>
                        </div>
                    </Card.Body>
                </Card>

                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i className="bi bi-pencil-square me-2"></i>
                            Update Donor Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleUpdate}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CNIC</Form.Label>
                                        <Form.Control
                                            type="text"
                                            pattern="\d{5}-\d{7}-\d"
                                            value={CNIC}
                                            onChange={(e) => setCNIC(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            pattern="^\d{10}$"
                                            value={phone}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Blood Group</Form.Label>
                                        <Form.Select
                                            value={bloodGroup}
                                            onChange={(e) => setBloodGroup(e.target.value)}
                                            required
                                        >
                                            <option value="">Select blood group</option>
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
                                <Button variant="primary" type="submit">
                                    <i className="bi bi-check-circle me-2"></i>
                                    Update Donor
                                </Button>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default UpdateUser;
