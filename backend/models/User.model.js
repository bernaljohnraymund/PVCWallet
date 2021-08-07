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
    emailVerificationHashCode: {
        type: String,
        default: ''
    },
    identityVerified: {
        type: Boolean,
        default: false
    },
    isEmailAuthEnabled: {
        type: Boolean,
        default: true
    },
    isPhoneAuthEnabled: {
        type: Boolean,
        default: false
    },
    isGoogleAuthEnabled: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date
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

schema.index({ expiresAt: 1 }, { expires: "1m" })

const UserModel = mongoose.model('User', schema, 'users');

module.exports = UserModel;