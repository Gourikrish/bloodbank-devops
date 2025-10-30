const Donor = require('../Models/Donor')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

let signup = (req, res) => {
    console.log("Sign Up method in Donor Controller called")
    console.log("Request body:", req.body)
    console.log("Blood Group received:", req.body.bloodGroup)
    Donor.findOne({email: req.body.email}) //First, I will check if the email already exists. If it does, I will not create the account
    .then((existingDonor) => {

        if (existingDonor)
        {
            return res.status(400).send({message: "Donor Account already exists with this email!"})
        }

        let donor = new Donor({
            name: req.body.name,
            CNIC: req.body.CNIC,
            phoneNumber: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            bloodGroup: req.body.bloodGroup || 'Not Yet Specified',
            //Role is automatically assigned the default value
        })

        console.log("Donor object to be saved:", donor)

        donor.save()
        .then((donor) => {
            res.status(200).send({message: "Donor Account created successfully!", donor: donor})
            console.log("Donor Account created successfully!")
        })
        .catch((err) => {
            res.status(400).send({message: "Error occurred while creating Donor Account", error: err})
        })
        
    })
    .catch((err) => {
        console.log("Error occurred while checking if the email already exists in the database")
    })

}

let login = (req, res) => {
    console.log("Login method in Donor Controller called")

    let email = req.body.email
    let password = req.body.password
    let secretKey = process.env.SECRET_KEY
    Donor.findOne({email: email})
    .then((donor) => {
        if (donor)
        {
            if (donor.password === password)
            {
                console.log("Login Successful")
                let token = jwt.sign({email: email, role: 'Donor'}, secretKey, {expiresIn: '1h'})
                res.status(200).send({message: "Login Successful", token: token, donor: donor})
            }

            else
            {
                res.status(401).send({message: "The password is incorrect"})
            }
        }

        else
        {
            res.status(404).send({message: "No Donor Account exists with this email"})
        }
        
    })
    .catch((err) => {
        res.status(404).send({message: "An error occurred during login", error: err.message})
    })

}

let retrieveAllDonors = (req, res) => {
    console.log("Retrieve All Donors method in Donor Controller called")

    Donor.find()
    .then((donors) => {
        res.status(200).send({message: "All Donors retrieved successfully!", donors: donors})
    })
    .catch((err) => {
        res.status(400).send({message: "Error occurred while retrieving all donors", error: err})
    })
}

let verify = (req, res) => {
    console.log("Verify method in Donor Controller called")

    let token = req.headers.authorization
    let secretKey = process.env.SECRET_KEY

    if (!token)
    {
        return res.status(403).send({message: "You are not allowed to perform this action"})
    }

    console.log("The token is: ", token)
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    
    if (req.user.role == "Donor")
    {
        res.status(200).send({message: "You are a Donor"})
    }

    else
    {
        return res.status(403).send({message: "You must be a donor to access this route"})
    }
}

module.exports = {
    signup,
    login,
    retrieveAllDonors,
    verify
}