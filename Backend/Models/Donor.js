const mongoose = require('mongoose')

const DonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    CNIC: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
        required: true,
        default: 'Not Yet Specified' //I have done this so that user can register and when goes to donate a blood, is taken a test to determine the blood group
    },

    city: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'Donor'
    }

})

module.exports = mongoose.model('Donor', DonorSchema) //Table name will be Donors