const moment = require('../utils/moment')
const mongoose = require('./connection');
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        default: '',
    },
    middleName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    identityVerified: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        expires: "5m"
    },
    unixCreatedAt: {
        type: String
    },
    unixUpdatedAt: {
        type: String
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', schema, 'users');

module.exports = UserModel;