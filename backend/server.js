require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const authentication = require('./utils/Authentication');

const User = require('./controllers/User.controller');
const Admin = require('./controllers/Admin.controller');

app.use(cors())
app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({ extended: true, limit: '25mb'}));

app.post('/api/register', User.register)
app.post('/api/verify/email', User.verifyEmail)
app.post('/api/user/login', User.login)
app.post('/api/user/generateotp', User.generateOtp)
app.post('/api/user/verifyotp', User.verifyOtp)
app.post('/api/user/kyc/basic', authentication.verify, User.submitKycBasicInfo)
app.post('/api/user/kyc/identity', authentication.verify, User.submitKycIdentityInfo)
app.post('/api/user/kyc/address', authentication.verify, User.submitKycProofOfAddressInfo)
app.get('/api/user/kyc', authentication.verify, User.getKycVerification)

app.get('/api/admin/user/:id', Admin.getUserKyc)

app.listen({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 4000,
})