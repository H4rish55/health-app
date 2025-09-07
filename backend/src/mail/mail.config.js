const nodemailer = require('nodemailer')
const { GOOGLE_MAIL, GMAIL_USERNAME } = require('../config/envVars')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USERNAME,
        pass: GOOGLE_MAIL
    }
})

const sender = 'VitalIQ <info@vitaliq.one>'

module.exports = {
    transporter,
    sender
}
