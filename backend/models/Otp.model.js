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
        enum: ['email', 'phone', 'google'],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date
    }
}, {
    timestamps: true
})

schema.index({ expiresAt: 1 }, { expires: "1m" })

const OtpModel = mongoose.model('Otp', schema, 'otp');

module.exports = OtpModel;