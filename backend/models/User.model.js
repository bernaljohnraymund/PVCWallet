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
    houseNumber: {
        type: Number,
    },
    postal: {
        type: Number
    },
    city: {
        type: String
    },
    countryName: {
        type: String
    },
    countryCode: {
        type: String
    },
    currency: {
        type: String
    },
    verificationStatus: {
        type: String,
        enum: ['not verified', 'basic information pending', 'basic information failed', 'basic information success', 'identity information pending', 'identity information failed', 'identity information success', 'proof of address pending', 'proof of address failed', 'proof of address success'],
        default: 'not verified'
    },
    verificationLevel: {
        type: Number,
        min: 0, max: 3,
        default: 0
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