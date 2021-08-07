const jwt = require('jsonwebtoken');

const Authentication = {
    async sign (payload)  { return await jwt.sign(payload, process.env.AUTH_SIGN) },

    async verify (payload) { 
        return jwt.verify(payload, process.env.AUTH_SIGN, function (err, data) {
            if (err) {
                return {status: 'fail', message: err}
            } else {
                return {status: 'success', data}
            }
        })
     }
}

module.exports = Authentication;