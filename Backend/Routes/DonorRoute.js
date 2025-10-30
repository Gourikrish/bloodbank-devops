const express = require('express');
const router = express.Router();
const DonorController = require('../Controllers/DonorController')

router.post('/signup', DonorController.signup)
router.post('/login', DonorController.login)
router.get('/retrieveDonors', DonorController.retrieveAllDonors) //This is a test route.
router.get('/all', DonorController.retrieveAllDonors) // Public route for blood search
router.get('/verify', DonorController.verify)

module.exports = router