const moment = require('../utils/moment')
const mongoose = require('./connection');
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    to: {
        type: String,
        enum: ['email', 'phone', 'googleAuth'],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        expires: "5m"
    }
}, {
    timestamps: true
})

const OtpModel = mongoose.model('Otp', schema, 'otp');

module.exports = OtpModel;