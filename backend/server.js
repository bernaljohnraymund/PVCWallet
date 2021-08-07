require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const Users = require('./controllers/User.controller');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/api/register', Users.register)
app.post('/api/verify/email', Users.verifyEmail)
app.post('/api/user/login', Users.login)
app.post('/api/user/generateotp', Users.generateOtp)
app.post('/api/user/verifyotp', Users.verifyOtp)

app.listen({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 4000,
})