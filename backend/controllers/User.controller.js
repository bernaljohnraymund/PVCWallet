const bcrypt = require('bcrypt');
const moment = require('../utils/moment');
const authentication = require('../utils/Authentication')
const UserModel = require('../models/User.model');
const Mailer = require('../utils/Mailer');
const Otp = require('../utils/Otp');
const OtpModel = require('../models/Otp.model');

const GEN_SALT = process.env.GEN_SALT;

const Users = {
    async register (req, res) {
        const validateForm = await Users.validateForm(req.body.username, req.body.email, req.body.password1, req.body.password2)
        let user;

        const dateNow = moment(Date.now()).format('X');

        if (validateForm.errors.length === 0) {
            let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
            let emailVerificationHashCode = bcrypt.hashSync(req.body.email, salt);
            // console.log('email hash done')
            let hashPassword = bcrypt.hashSync(req.body.password1, salt);
            // console.log('password hash done')
            user = await UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                emailVerificationHashCode,
                expiresAt: moment(Date.now()).add(5, 'minutes'),
                unixCreatedAt: dateNow,
                unixUpdatedAt: dateNow
            })
            // console.log(user)
            const mailer = new Mailer();

            await mailer.createEmail('emailVerification', user.email, 'Email verification', {
                title: "Email verfication",
                description: 'Your email was used to create account to our platform. Click the verify link for your verification or just delete this message if you did not execute this.',
                securityCode: emailVerificationHashCode,
                link: process.env.CLIENT_PROTOCOL + '://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT + `/#/email-verification?status=verifying&email=${user.email}&code=${user.emailVerificationHashCode}`
            })
            await mailer.send()
        }

        // if (user !== undefined) {
        // }

        let jsonResponse = {};

        jsonResponse.status = validateForm.status;
        jsonResponse[validateForm.errors.length === 0 ? 'obj' : 'errors'] = validateForm.errors.length === 0 ? { email:req.body.email } : validateForm.errors;

        res.json({ ...jsonResponse });
    },

    async verifyPassword (password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    },

    async login (req, res) {
        let jsonResponse = {};
        if (req.url === '/api/user/login') {
            jsonResponse = await Users.userLogin({ ...req.body })
        }
        // console.log(jsonResponse)
        res.json({ ...jsonResponse })
    },

    async userLogin (user = {}) {
        let errors = [];
        let token;

        // console.log(user)

        const userDoc = await UserModel.findOne({
            $or: [
                { username: user.username },
                { email: user.username }
            ]
        })
        
        console.log(userDoc == null)

        if (userDoc == null) {
            errors.push('username/email or password is incorrect')
            // console.log('in null')
            return {
                status: 'fail',
                errors
            }
        }else
        if (await Users.verifyPassword(user.password, userDoc.password) === false) {
            errors.push('username/email or password is incorrect')
            // console.log('in invalid password')
            return {
                status: 'fail',
                errors
            }
        }

        if (await Users.verifyPassword(user.password, userDoc.password) && errors.length === 0) {
            token = await authentication.sign({
                data: {
                    email: user.email,
                    username: user.username,
                }
            });
        }

        let jsonResponse = {};

        if (errors.length > 0) {
            jsonResponse.status = 'fail';
            jsonResponse.errors = errors;
        }else
        if (token !== undefined) {
            // console.log(token)
            jsonResponse.status = 'success';
            jsonResponse.message = token;
        }

        return jsonResponse;

    },

    async generateOtp(req, res) {
        let errors = [];
        let otpDoc;
        console.log(req.body)
        let userDoc = await UserModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })

        if (userDoc == null) {
            res.json({
                status: 'fail',
                errors
            })
        }

        const otpCode = await Otp.generateOtp();

        // find and update if no otpDoc yet
        otpDoc = await OtpModel.findOne({
            username: userDoc.username,
            operation: req.body.operation,
            to: req.body.to
        })

        // if (otpDoc) {
        otpDoc = await OtpModel.findOneAndUpdate({
            username: userDoc.username,
            operation: req.body.operation,
            to: req.body.to
        }, {
            code: otpCode,
            expiresAt: moment(Date.now()).add(1, 'minutes'),
        }, {
            new: true
        })
        console.log('found', otpDoc);
        // }else
        // if still no otpDoc, create one
        if (!otpDoc) {
            console.log('otp created')
            otpDoc = await OtpModel.create({
                username: userDoc.username,
                operation: req.body.operation,
                to: req.body.to,
                code: otpCode,
                expiresAt: moment(Date.now()).add(1, 'minutes'),
            });
        }

        // conditions where to send otp
        if (req.body.to === 'email') {
            const mailer = new Mailer();
            await mailer.createEmail('loginOtp', userDoc.email, 'Email verification', {
                title: "Login One Time Passcode",
                description: `Your login code is`,
                code: otpCode,
            })
            await mailer.send()
        }else 
        if (req.body.to === 'phone') {

        }else
        if (req.body.to === 'googleAuth') {

        }

        res.json({
            status: 'success',
            message: `OTP was sent to your ${otpDoc.to}`
        })

    },

    async validateForm (username, email, password1, password2) {
        let errors = [];

        // look for the same username and email
        const emailDoc = await UserModel.findOne({ email });
        const usernameDoc = await UserModel.findOne({ username });

        if (username === '') {
            errors.push('username can not be empty');
        }else
        if (usernameDoc != null) {
            errors.push('username already exists');
        }
        // validate email
        if (email === '') {
            errors.push('email can not be empty');
        }else
        if (Users.validateEmail(email) === 'invalid') {
            errors.push('invalid email');
        }else
        if (emailDoc != null) {
            errors.push('email already exists');
        }
        if (password1 === '') {
            errors.push('password can not be empty');
        }else
        if (password1 !== password2 ) {
            errors.push('Password do not match');
        }else
        if (password1.length < 8) {
            errors.push('Password length must be greater than 8');
        }

        return {
            status: errors.length > 0 ? 'fail' : 'success',
            errors
        }
    },

    async validateEmail (email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) ? 'valid' : 'invalid';
    },

    async verifyEmail (req, res) {
        let errors = [];
        let isValidated;
        let userDoc = await UserModel.findOne({
            $or: [{
                emailVerificationHashCode: req.body.emailVerificationHashCode,
                email: req.body.email
            }]
        }, {email: 1, emailVerificationHashCode: 1, emailVerified: 1} );
        // console.log(userDoc)
        if (userDoc == null) {
            errors.push('record not found');
        }
        else
        if (userDoc.emailVerified === false) {
            isValidated = bcrypt.compareSync(req.body.email, userDoc.emailVerificationHashCode);

            !isValidated ? errors.push('invalid') : '';
        }

        if (isValidated && userDoc !== null && userDoc.emailVerified == false) {
            const email = userDoc.email;

            let updatedUserDoc = await UserModel.findOneAndUpdate({ email }, {
                $unset: {
                    expiresAt: 1, emailVerificationHashCode: 1
                },
                $set: {
                    emailVerified: true,
                }
            }, {
                new: true
            })
        }

        let jsonResponse = {};


        if (errors.length > 0) {
            jsonResponse.status = 'fail';
            jsonResponse.errors = ['Your link might have been expired'];
        } else {
            jsonResponse.status = 'success';
            jsonResponse.message = 'Email verified';
        }

        res.json( { ...jsonResponse } );
    }
}

module.exports = Users;