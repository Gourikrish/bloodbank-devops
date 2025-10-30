const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/AdminController')
const jwt = require('jsonwebtoken')

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization
 
    if (!token)
    {
         return res.status(403).send({message: "You are not allowed to perform this action"})
    }
 
    console.log("The token is: ", token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        console.log("The token is for: ", req.user.email)
        
        if (req.user.role == "Admin")
        {
            next();
        }
    
        else
        {
            return res.status(403).send({message: "You must be an administrator to access this route"})
        }

}
 


router.post('/signup', AdminController.signup)
router.post('/login', AdminController.login)
router.put('/updateDonor', isAuthorized, AdminController.updateDonor)
router.delete('/deleteDonor', isAuthorized, AdminController.deleteDonor)
router.get('/retrieveAllDonors', isAuthorized, AdminController.retrieveAllDonors)
router.get('/verify', AdminController.verify)



module.exports = router