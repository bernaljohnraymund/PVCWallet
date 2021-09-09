const UserModel = require('../models/User.model');
const Admin = {
    async getUserKyc (req, res) {
        let user;
        let users;
        let errors = []
        if (req.params.id === 'all') {
            users = await UserModel.find({
                $or: [{
                    verificationStatus: 'basic information pending'
                },
                {
                    verificationStatus: 'identity information pending'
                },
                {
                    verificationStatus: 'proof of address pending'
                }]
            })
        } else {
            const user = await UserModel.findOne({
                _id: req.params.id
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
    }
}

module.exports = Admin