const Users = {
    async register (req, res) {
        const validateForm = await Users.validateForm(req.body.username, req.body.email, req.body.password1, req.body.password2)

        res.json({ status: validateForm.status, errors: validateForm.errors, message: validateForm.message });
    },

    async validateForm (username, email, password1, password2) {
        let errors = [];
        let message = '';

        if (username === '') {
            errors.push('username can not be empty');
        }
        if (email === '') {
            errors.push('email can not be empty');
        }
        // validate email
        if (Users.validateEmail(email) === 'invalid') {
            errors.push('invalid email')
        }
        if (password1 === '') {
            errors.push('password can not be empty');
        }
        if (password1 !== password2 ) {
            errors.push('Password do not match')
        }

        return {
            status: errors.length > 0 ? 'fail' : 'success',
            errors,
            message
        }
    },

    async validateEmail (email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) ? 'valid' : 'invalid';
    },
}

module.exports = Users;