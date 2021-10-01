const bcrypt = require('bcrypt');
const moment = require('../utils/moment')
const AdminModel = require('../models/Admin.model');
const Mailer = require('../utils/Mailer');
// const GEN_SALT = process.env.GEN_SALT;

const Admin = {
    async createAccount (req, res) {
        let errors = []
        const RegEx = /[~`@#$%^&*()_+\[\]{}:;|\\"=\/'<,>.?]/g
        let accountForm = req.body

        accountForm.role = accountForm.role.replace(/\s+/g,' ').trim();
        accountForm.username = accountForm.username.replace(/\s+/g,' ').trim();
        accountForm.email = accountForm.email.replace(/\s+/g,' ').trim();
        // password
        // confirmPassword
        // accountForm.country = accountForm.country.replace(/\s+/g,' ').trim();
        // birthDate
        accountForm.firstName = accountForm.firstName.replace(/\s+/g,' ').trim();
        accountForm.lastName = accountForm.lastName.replace(/\s+/g,' ').trim();
        accountForm.middleName = accountForm.middleName.replace(/\s+/g,' ').trim();
        accountForm.houseNumber = accountForm.houseNumber.replace(/\s+/g,' ').trim();
        accountForm.street = accountForm.street.replace(/\s+/g,' ').trim();
        accountForm.postal = accountForm.postal.replace(/\s+/g,' ').trim();
        accountForm.city = accountForm.city.replace(/\s+/g,' ').trim();

        const emailDoc = await AdminModel.findOne({ email: accountForm.email });
        const usernameDoc = await AdminModel.findOne({ username: accountForm.username });

        if (accountForm.username === '') {
            errors.push('username can not be empty');
        }else
        if (usernameDoc != null) {
            errors.push('username already exists');
        }
        // validate email
        if (accountForm.email === '') {
            errors.push('email can not be empty');
        }else
        if (Admin.validateEmail(accountForm.email) === 'invalid') {
            errors.push('invalid email');
        }else
        if (emailDoc != null) {
            errors.push('email already exists');
        }
        if (accountForm.password === '') {
            errors.push('password can not be empty');
        }else
        if (accountForm.password !== accountForm.confirmPassword ) {
            errors.push('Password do not match');
        }else
        if (accountForm.password.length < 8) {
            errors.push('Password length must be greater than 8');
        }
        // validate first name
        if (accountForm.firstName === '') {
            errors.push('First name can not be empty')
        }else
        if (accountForm.firstName.match(RegEx)) {
            errors.push('First name can not contain special characters')
        }
        // validate last name
        if (accountForm.lastName === '') {
            errors.push('Last name can not be empty')
        }else
        if (accountForm.lastName.match(RegEx)) {
            errors.push('Last name can not contain special characters')
        }
        // validate middle name
        if (accountForm.middleName === '') {
            errors.push('Middle name can not be empty')
        }else
        if (accountForm.middleName.match(RegEx)) {
            errors.push('Middle name can not contain special characters')
        }
        // validate birthdate
        const dToday = moment()
        const dBirthDate = moment(accountForm.birthDate.val, 'YYYY/MM/DD')

        if (typeof accountForm.birthDate !== 'object') {
            errors.push('Birthdate can not be empty')
        }else
        if (accountForm.birthDate.val === '') {
            errors.push('Birthdate can not be empty')
        }else
        if (dToday.diff(dBirthDate, 'years') < 18) {
            errors.push('Only 18 years old or above are allowed')
        }
        // validate house number
        if (accountForm.houseNumber === '') {
            errors.push('House number can not be empty')
        }else
        if (!accountForm.houseNumber.match(/^[0-9]+$/)) {
            errors.push('Invalid house number')
        }
        // validate street
        if (accountForm.street === '') {
            errors.push('street can not be empty')
        }
        // validate postal
        if (accountForm.postal === '') {
            errors.push('Postal can not be empty')
        }else
        if (!accountForm.postal.match(/^[0-9]+$/)) {
            errors.push('Invalid postal')
        }
        // validate city
        if (accountForm.city === '') {
            errors.push('City can not be empty')
        }
        // validate residence of address
        if (typeof accountForm.country !== 'object') {
            errors.push('Residence of address can not be empty')
        }

        if (errors.length > 0) {
            res.json({
                status: 'fail',
                errors
            })
            return
        }
        const dateNow = moment(Date.now()).format('X');
        let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
        let emailVerificationHashCode = bcrypt.hashSync(req.body.email, salt);

        // if no errors then perform queries
        const admin = await AdminModel.create({
            username: accountForm.username,
            password: accountForm.password,
            email: accountForm.email,
            firstName: accountForm.firstName,
            middleName: accountForm.middleName,
            lastName: accountForm.lastName,
            birthDate: accountForm.birthDate.val,
            role: accountForm.role,
            emailVerified: accountForm.emailVerified,
            emailVerificationHashCode,
            houseNumber: accountForm.houseNumber,
            street: accountForm.street,
            postal: accountForm.postal,
            city: accountForm.city,
            expiresAt: moment(Date.now()).add(1, 'minutes'),
            unixCreatedAt: dateNow,
            unixUpdatedAt: dateNow
        })

        const mailer = new Mailer();

        await mailer.createEmail('adminEmailVerification', accountForm.email, 'Email verification', {
            title: "Email verfication",
            description: 'Your email was used to create account to our platform. Click the verify link for your verification or just delete this message if you did not execute this.',
            securityCode: emailVerificationHashCode,
            link: process.env.ADMIN_PROTOCOL + '://' + process.env.ADMIN_HOST + ':' + process.env.ADMIN_PORT + `/#/email-verification?status=verifying&email=${accountForm.email}&code=${admin.emailVerificationHashCode}`
        })
        console.log(process.env.ADMIN_PROTOCOL + '://' + process.env.ADMIN_HOST + ':' + process.env.ADMIN_PORT + `/#/email-verification?status=verifying&email=${accountForm.email}&code=${admin.emailVerificationHashCode}`)
        await mailer.send()

        res.json({
            status: 'success',
            message: 'New admin account is waiting for verification. Verification link was sent to email.',
            payload: {}
        })
    },
    // async validateForm (username, email, password1, password2) {
    //     let errors = [];

    //     // look for the same username and email
    //     const emailDoc = await UserModel.findOne({ email });
    //     const usernameDoc = await UserModel.findOne({ username });

    //     if (username === '') {
    //         errors.push('username can not be empty');
    //     }else
    //     if (usernameDoc != null) {
    //         errors.push('username already exists');
    //     }
    //     // validate email
    //     if (email === '') {
    //         errors.push('email can not be empty');
    //     }else
    //     if (Users.validateEmail(email) === 'invalid') {
    //         errors.push('invalid email');
    //     }else
    //     if (emailDoc != null) {
    //         errors.push('email already exists');
    //     }
    //     if (password1 === '') {
    //         errors.push('password can not be empty');
    //     }else
    //     if (password1 !== password2 ) {
    //         errors.push('Password do not match');
    //     }else
    //     if (password1.length < 8) {
    //         errors.push('Password length must be greater than 8');
    //     }

    //     return {
    //         status: errors.length > 0 ? 'fail' : 'success',
    //         errors
    //     }
    // },
    async verifyEmail (req, res) {
        let errors = [];
        let isValidated;
        let adminDoc = await AdminModel.findOne({
            $or: [{
                emailVerificationHashCode: req.body.emailVerificationHashCode,
                email: req.body.email
            }]
        }, {email: 1, emailVerificationHashCode: 1, emailVerified: 1} );
        // console.log(adminDoc)
        if (adminDoc == null) {
            errors.push('record not found');
        }
        else
        if (adminDoc.emailVerified === false) {
            isValidated = bcrypt.compareSync(req.body.email, adminDoc.emailVerificationHashCode);

            !isValidated ? errors.push('invalid') : '';
        }

        if (isValidated && adminDoc !== null && adminDoc.emailVerified == false) {
            const email = adminDoc.email;

            let updatedAdminDoc = await AdminModel.findOneAndUpdate({ email }, {
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
    async validateEmail (email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) ? 'valid' : 'invalid';
    },
    async getUserKyc (req, res) {
        let user;
        let users;
        let errors = []
        if (req.params.id === 'all') {
            users = await AdminModel.find({
                $or: [{
                    verificationStatus: 'basic information pending'
                },
                {
                    verificationStatus: 'identity information pending'
                },
                {
                    verificationStatus: 'proof of address pending'
                }]
            }, {
                password: 0
            })
        } else {
            user = await AdminModel.findOne({
                _id: req.params.id
            }, {
                password: 0
            })
        }

        if (users !== undefined) {
            res.json({
                status: 'success',
                payload: users
            })
        }else
        if (user !== undefined) {
            res.json({
                status: 'success',
                payload: user
            })
        }else {
            res.json({
                status: 'fail',
            })
        }
    },

    async putUserKyc (req, res) {
        if (req.body.updateType === 'userKycVerification') {
            let errors = []
            let user;

            user = await AdminModel.findOne({
                _id: req.params.id
            })

            if (!user || user === undefined) {
                errors.push('user not found')
            }else
            if (user) {
                user.verificationStatus = req.body.verificationStatus
                user.verificationLevel = req.body.verificationStatus === 'basic information success' ? 1 : req.body.verificationStatus === 'identity information success' ? 2 : req.body.verificationStatus === 'proof of address success' ? 3 : user.verificationLevel

                user.save()
                
            }

            // user = await AdminModel.findOneAndUpdate({
            //     _id: req.params.id
            // },
            // {
            //     verificationStatus: req.body.verificationStatus,
            //     verificationLevel: req.body.verificationStatus === 'basic information pending'
            // },
            // {
            //     new: true
            // })

            if (errors.length > 0) {
                res.json({
                    status: 'fail',
                    errors
                })
            }

            let messageStatus = '';
            if (req.body.verificationStatus === 'basic information failed' || req.body.verificationStatus === 'identity information failed' || req.body.verificationStatus === 'proof of address failed') {
                messageStatus = 'rejected'
            }else
            if (req.body.verificationStatus === 'basic information success' || req.body.verificationStatus === 'identity information success' || req.body.verificationStatus === 'proof of address success') {
                messageStatus = 'approved'
            }

            res.json({
                status: 'success',
                message: `user has been ${messageStatus}`,
                payload: user
            })
        }
    }
}

module.exports = Admin