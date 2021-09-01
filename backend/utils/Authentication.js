const jwt = require('jsonwebtoken');

const Authentication = {
    async sign (payload)  { return await jwt.sign(payload, process.env.AUTH_SIGN) },

    async verify (req, res, next) {
        const token = req.headers['auth-token']
        
        const tokenVerification = await jwt.verify(token, process.env.AUTH_SIGN, function (err, data) {
            if (err) {
                return {status: 'fail', message: err}
            } else {
                return {status: 'success', data}
            }
        })

        if (tokenVerification.status === 'success') {
            next()
        }else {
            return tokenVerification
        }
     }
}

module.exports = Authentication;