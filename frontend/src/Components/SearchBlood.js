import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, InputGroup, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const SearchBlood = () => {
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        fetchAllDonors();
    }, []);

    const fetchAllDonors = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/donor/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setDonors(data.donors);
                setFilteredDonors(data.donors);
            } else {
                toast.error('Error loading donors');
            }
        } catch (error) {
            console.log("Error occurred while retrieving donors", error);
            toast.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        let results = donors;

        if (bloodGroup) {
            results = results.filter(donor => donor.bloodGroup === bloodGroup);
        }

        if (city) {
            results = results.filter(donor =>
                donor.city.toLowerCase().includes(city.toLowerCase())
            );
        }

        setFilteredDonors(results);

        if (results.length === 0) {
            toast.info('No donors found matching your criteria');
        }
    };

    const handleReset = () => {
        setBloodGroup('');
        setCity('');
        setFilteredDonors(donors);
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

    const getBloodStats = () => {
        const stats = {};
        bloodGroups.forEach(group => {
            stats[group] = donors.filter(d => d.bloodGroup === group).length;
        });
        return stats;
    };

    const stats = getBloodStats();

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h1 className="display-5 fw-bold text-danger">
                            <i className="bi bi-search me-3"></i>
                            Search Blood Donors
                        </h1>
                        <p className="lead text-muted">Find blood donors by blood group and location</p>
                    </Col>
                </Row>

                {/* Blood Group Statistics */}
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3">
                                    <i className="bi bi-bar-chart-fill me-2"></i>
                                    Available Donors by Blood Group
                                </h5>
                                <Row className="text-center">
                                    {bloodGroups.map(group => (
                                        <Col xs={6} md={3} key={group} className="mb-3">
                                            <Badge bg={getBloodGroupBadge(group)} className="mb-2 p-2" style={{fontSize: '1.2rem'}}>
                                                {group}
                                            </Badge>
                                            <div className="h4 fw-bold text-primary">{stats[group] || 0}</div>
                                            <small className="text-muted">Donors</small>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Search Filters */}
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3">
                                    <i className="bi bi-funnel me-2"></i>
                                    Search Filters
                                </h5>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <i className="bi bi-droplet-fill text-danger me-2"></i>
                                                Blood Group
                                            </Form.Label>
                                            <Form.Select
                                                value={bloodGroup}
                                                onChange={(e) => setBloodGroup(e.target.value)}
                                            >
                                                <option value="">All Blood Groups</option>
                                                {bloodGroups.map((group) => (
                                                    <option key={group} value={group}>
                                                        {group}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <i className="bi bi-geo-alt me-2"></i>
                                                City
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter city name"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <div className="d-grid gap-2 w-100 mb-3">
                                            <Button variant="danger" onClick={handleSearch}>
                                                <i className="bi bi-search me-2"></i>
                                                Search
                                            </Button>
                                            <Button variant="outline-secondary" onClick={handleReset}>
                                                <i className="bi bi-arrow-counterclockwise me-2"></i>
                                                Reset
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Results */}
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">
                                <i className="bi bi-people-fill me-2"></i>
                                Search Results
                            </h5>
                            <Badge bg="primary" pill>
                                {filteredDonors.length} {filteredDonors.length === 1 ? 'Donor' : 'Donors'} Found
                            </Badge>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading donors...</p>
                            </div>
                        ) : filteredDonors.length > 0 ? (
                            <div className="table-responsive">
                                <Table striped hover>
                                    <thead className="table-danger">
                                        <tr>
                                            <th>Name</th>
                                            <th>Blood Group</th>
                                            <th>City</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDonors.map((donor) => (
                                            <tr key={donor._id}>
                                                <td>
                                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                                    {donor.name}
                                                </td>
                                                <td>
                                                    <Badge bg={getBloodGroupBadge(donor.bloodGroup)}>
                                                        {donor.bloodGroup}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <i className="bi bi-geo-alt me-1 text-muted"></i>
                                                    {donor.city}
                                                </td>
                                                <td>
                                                    <a href={`tel:${donor.phoneNumber}`} className="text-decoration-none">
                                                        <i className="bi bi-telephone-fill me-1"></i>
                                                        {donor.phoneNumber}
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <Alert variant="info" className="text-center">
                                <i className="bi bi-info-circle display-4 d-block mb-3"></i>
                                <h5>No donors found</h5>
                                <p className="mb-0">
                                    {bloodGroup || city
                                        ? 'Try adjusting your search criteria or reset filters'
                                        : 'No donors are currently registered in the system'}
                                </p>
                            </Alert>
                        )}
                    </Card.Body>
                </Card>

                {/* Important Notice */}
                <Row className="mt-4">
                    <Col>
                        <Alert variant="warning">
                            <Alert.Heading>
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Important Notice
                            </Alert.Heading>
                            <p className="mb-0">
                                <strong>Before contacting a donor:</strong> Please ensure this is a genuine emergency.
                                Blood donation is a voluntary act of kindness. Always verify blood compatibility and
                                consult with medical professionals before any blood transfusion.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default SearchBlood;
