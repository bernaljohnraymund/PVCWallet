const bcrypt = require('bcrypt');
const moment = require('../utils/moment');
const authentication = require('../utils/Authentication');
const UserModel = require('../models/User.model');
const Mailer = require('../utils/Mailer');
const Otp = require('../utils/Otp');
const OtpModel = require('../models/Otp.model');

const GEN_SALT = process.env.GEN_SALT;

const User = {
    async register (req, res) {
        const validateForm = await User.validateForm(req.body.username, req.body.email, req.body.password1, req.body.password2)
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
                expiresAt: moment(Date.now()).add(1, 'minutes'),
                unixCreatedAt: dateNow,
                unixUpdatedAt: dateNow
            })
            // console.log(user)
            const mailer = new Mailer();

            await mailer.createEmail('userEmailVerification', user.email, 'Email verification', {
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
            jsonResponse = await User.userLogin({ ...req.body })
        }
        // console.log(jsonResponse)
        res.json({ ...jsonResponse })
    },

    async userLogin (user = {}) {
        let errors = [];

        if (user.username === '' || user.password === '') {
            errors.push('username/email or password is incorrect')
            // console.log('in null')
            return {
                status: 'fail',
                errors
            }
        }

        const userDoc = await UserModel.findOne({
            $or: [
                { username: user.username },
                { email: user.username }
            ]
        })

        if (userDoc == null) {
            errors.push('username/email or password is incorrect')
            // console.log('in null')
            return {
                status: 'fail',
                errors
            }
        }else
        if (!userDoc.emailVerified) {
            errors.push('username/email or password is incorrect')
            return {
                status: 'fail',
                errors
            }
        }
        if (await User.verifyPassword(user.password, userDoc.password) === false) {
            errors.push('username/email or password is incorrect')
            // console.log('in invalid password')
            return {
                status: 'fail',
                errors
            }
        }

        let jsonResponse = {};

        if (errors.length > 0) {
            jsonResponse.status = 'fail';
            jsonResponse.errors = errors;
        }else {
            jsonResponse.status = 'success';
            jsonResponse.message = 'success';
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
            errors.push('Something went wrong. Please try again later');
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
        // }else
        // if still no otpDoc, create one
        if (!otpDoc) {
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

    async verifyOtp (req, res) {

        let errors = [];

        const userDoc = await UserModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        console.log(req.body)
        if (userDoc.isEmailAuthEnabled) {
           const otpDoc = await OtpModel.findOne({ 
                to: 'email',
                username: userDoc.username,
                operation: req.body.operation,
                code: req.body.emailCode,
             })

             console.log(otpDoc)
             !otpDoc ? errors.push('invalid email code') : '';
        }
        if (userDoc.isPhoneAuthEnabled) {
           const otpDoc = await OtpModel.findOne({ 
                to: 'phone',
                username: userDoc.username,
                operation: req.body.operation,
                code: req.body.phoneCode,
             })

             !otpDoc ? errors.push('invalid phone code') : '';
        }
        if (userDoc.isGoogleAuthEnabled) {
           const otpDoc = await OtpModel.findOne({ 
                to: 'google',
                username: userDoc.username,
                operation: req.body.operation,
                code: req.body.googleCode,
             })

             !otpDoc ? errors.push('invalid google code') : '';
        }

        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
            return
        }

        let token = await authentication.sign({
            data: {
                email: userDoc.email,
                username: userDoc.username,
                _id: userDoc._id,
            }
        });

        res.json({
            status: 'success',
            message: 'Login successful',
            token,
            username: userDoc.username,
            email: userDoc.email,
            firstName: userDoc.firstName,
            middleName: userDoc.middleName,
            lastName: userDoc.lastName,
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
        if (User.validateEmail(email) === 'invalid') {
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
    },

    async getKycVerification (req, res) {
        let errors = []
        const user = await UserModel.findOne({
            $or: [
                { username: req.user.username },
                { email: req.user.email }
            ]
        }, {
            verificationStatus: 1,
            verificationLevel: 1,
            _id: 0
        })

        if (!user || user === '') {
            errors.push('no user found')
        }

        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
        }

        if (errors.length === 0) {
            res.json({
                status: 'success',
                payload: user
            })
        }
    },

    async submitKycBasicInfo (req, res) {
        let errors = []
        const RegEx = /[~`@#$%^&*()_+\[\]{}:;|\\"=\/'<,>.?]/g
        let basicInfoForm = req.body

        basicInfoForm.firstName = basicInfoForm.firstName.replace(/\s+/g,' ').trim();
        basicInfoForm.middleName = basicInfoForm.middleName.replace(/\s+/g,' ').trim();
        basicInfoForm.lastName = basicInfoForm.lastName.replace(/\s+/g,' ').trim();
        basicInfoForm.houseNumber = basicInfoForm.houseNumber.replace(/\s+/g,'').trim();
        basicInfoForm.street = basicInfoForm.street.replace(/\s+/g,'').trim();
        basicInfoForm.postal = basicInfoForm.postal.replace(/\s+/g,'').trim();
        basicInfoForm.city = basicInfoForm.city.replace(/\s+/g,' ').trim();

        // validate first name
        if (basicInfoForm.firstName === '') {
            errors.push('First name can not be empty')
        }else
        if (basicInfoForm.firstName.match(RegEx)) {
            errors.push('First name can not contain special characters')
        }
        // validate last name
        if (basicInfoForm.lastName === '') {
            errors.push('Last name can not be empty')
        }else
        if (basicInfoForm.lastName.match(RegEx)) {
            errors.push('Last name can not contain special characters')
        }
        // validate middle name
        if (basicInfoForm.middleName === '') {
            errors.push('Middle name can not be empty')
        }else
        if (basicInfoForm.middleName.match(RegEx)) {
            errors.push('Middle name can not contain special characters')
        }
        // validate birthdate
        const dToday = moment()
        const dBirthDate = moment(basicInfoForm.birthDate.val, 'YYYY/MM/DD')

        if (typeof basicInfoForm.birthDate !== 'object') {
            errors.push('Birthdate can not be empty')
        }else
        if (basicInfoForm.birthDate.val === '') {
            errors.push('Birthdate can not be empty')
        }else
        if (dToday.diff(dBirthDate, 'years') < 18) {
            errors.push('Only 18 years old or above are allowed')
        }
        // validate house number
        if (basicInfoForm.houseNumber === '') {
            errors.push('House number can not be empty')
        }else
        if (!basicInfoForm.houseNumber.match(/^[0-9]+$/)) {
            errors.push('Invalid house number')
        }
        // validate street
        if (basicInfoForm.street === '') {
            errors.push('street can not be empty')
        }
        // validate postal
        if (basicInfoForm.postal === '') {
            errors.push('Postal can not be empty')
        }else
        if (!basicInfoForm.postal.match(/^[0-9]+$/)) {
            errors.push('Invalid postal')
        }
        // validate city
        if (basicInfoForm.city === '') {
            errors.push('City can not be empty')
        }
        // validate residence of address
        if (typeof basicInfoForm.country !== 'object') {
            errors.push('Residence of address can not be empty')
        }

        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
            return
        }

        // if no errors then perform queries
        console.log(basicInfoForm.birthDate)
        const user = await UserModel.findOneAndUpdate({
            $or: [
                { username: req.user.username },
                { email: req.user.email }
            ]
        }, {
            firstName: basicInfoForm.firstName,
            middleName: basicInfoForm.middleName,
            lastName: basicInfoForm.lastName,
            birthDate: basicInfoForm.birthDate.val,
            houseNumber: basicInfoForm.houseNumber,
            street: basicInfoForm.street,
            postal: basicInfoForm.postal,
            city: basicInfoForm.city,
            countryName: basicInfoForm.country.name,
            countryCode: basicInfoForm.country.code,
            currency: basicInfoForm.country.currency,
            verificationStatus: 'basic information pending'
        },
        {
            new: true
        })

        res.json({
            status: 'success',
            message: 'basic info submitted successfully',
            payload: {}
        })
    },
    async submitKycIdentityInfo (req, res) {
        const reqPayload = req.body
        const errors = []
        const expectedType = ['data:image/jpeg;base64', 'data:image/jpg;base64', 'data:image/gif;base64', 'data:image/png;base64']

        let isValidSelfieImage = expectedType.some((val) => {
            return reqPayload.selfieImage.match(val)
        })

        let isValidIdmage = expectedType.some((val) => {
            return reqPayload.idImage.match(val)
        })

        if (!isValidSelfieImage) {
            errors.push('Selfie is not valid image')
        }

        if (!isValidIdmage) {
            errors.push('ID is not valid image')
        }

        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
        }

        const user = await UserModel.findOneAndUpdate({
            $or: [
                { username: req.user.username },
                { email: req.user.email }
            ]
        }, {
            selfieImage: reqPayload.selfieImage,
            idImage: reqPayload.idImage,
            verificationStatus: 'identity information pending',
        }, {
            new: true
        })

        res.json({
            status: 'success',
            message: 'Identity info submitted successfully',
            payload: {}
        })
    },
    async submitKycProofOfAddressInfo (req, res) {
        const reqPayload = req.body
        const errors = []
        const expectedType = ['data:image/jpeg;base64', 'data:image/jpg;base64', 'data:image/gif;base64', 'data:image/png;base64']

        let isValidAddressImage = expectedType.some((val) => {
            return reqPayload.addressImage.match(val)
        })
        if (!isValidAddressImage) {
            errors.push('Document is not valid image')
        }
        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
        }

        const user = await UserModel.findOneAndUpdate({
            $or: [
                { username: req.user.username },
                { email: req.user.email }
            ]
        }, {
            addressImage: reqPayload.addressImage,
            verificationStatus: 'proof of address pending',
        }, {
            new: true
        })

        res.json({
            status: 'success',
            message: 'Proof of address info submitted successfully',
            payload: {}
        })
    }
}

module.exports = User;