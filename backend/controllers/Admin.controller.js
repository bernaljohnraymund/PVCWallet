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
            }, {
                password: 0
            })
        } else {
            user = await UserModel.findOne({
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

            user = await UserModel.findOne({
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

            // user = await UserModel.findOneAndUpdate({
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