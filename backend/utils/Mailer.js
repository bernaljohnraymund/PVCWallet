const path = require('path')
const nodemailer = require('nodemailer');
const ejs = require('ejs');


class Mailer {
    
    transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    options = {};

    constructor () {
    }
    async createEmail (email, subject, content) {
        console.log(content.securityCode)
        ejs.renderFile(path.join(__dirname, '../template/mail.ejs'), { subject, content, link: process.env.CLIENT_PROTOCOL + '://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT + `/#/email-verification?status=verifying&email=${email}&code=${content.securityCode}` }, (err, data) => {
            if (err) {
                console.log(err);
                return
            }

            this.options.from = 'PVCCryptoWallet ' + process.env.EMAIL_ADDRESS;
            this.options.subject = subject;
            this.options.to = email;
            this.options.html = data;
        })
    }
    async send () {
        const mail = await this.transporter.sendMail(this.options)
    }
}

module.exports = Mailer;