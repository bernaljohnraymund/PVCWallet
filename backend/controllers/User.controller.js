const moment = require('../utils/moment');
const UserModel = require('../models/User.model');
const Mailer = require('../utils/Mailer');

const Users = {
    async register (req, res) {
        const validateForm = await Users.validateForm(req.body.username, req.body.email, req.body.password1, req.body.password2)
        let user;

        const dateNow = moment(Date.now()).format('X')

        if (validateForm.errors.length === 0) {
            user = await UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password1,
                expiresAt: moment(Date.now()).add(5, 'minutes'),
                unixCreatedAt: dateNow,
                unixUpdatedAt: dateNow
            })
        }

        if (user !== undefined || user !== null) {
            const mailer = new Mailer();
            await mailer.createEmail(user.email, 'Email verification', {
                title: "Email verfication",
                body: 'Your email was used to create account to our platform. Click this link to confirm your email verfication: link <br/> Leave this message if you did not execute this'
            })
            await mailer.send()
        }

        let jsonResponse = {};

        jsonResponse.status = validateForm.status;
        jsonResponse[validateForm.errors.length === 0 ? 'obj' : 'errors'] = validateForm.errors.length === 0 ? { email:req.body.email } : validateForm.errors;

        res.json({ ...jsonResponse });
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
}

module.exports = Users;