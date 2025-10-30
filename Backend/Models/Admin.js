const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
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

    role: {
        type: String,
        default: 'Admin'
    }
})
//Since admin is not really a donor and will not need to, his/her blood group is not required in the database.
module.exports = mongoose.model('Admin', AdminSchema) //Table name will be Admins