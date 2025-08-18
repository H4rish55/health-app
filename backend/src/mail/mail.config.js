const { MailtrapClient } = require("mailtrap");
const { MAIL_TOKEN } = require('../config/envVars')

const client = new MailtrapClient({ token: MAIL_TOKEN })

const sender = {
    email: 'info@demomailtrap.co',
    name: 'harish'
}

module.exports = {
    client,
    sender
}

