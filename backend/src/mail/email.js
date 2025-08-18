const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } = require("./emailTemplates")
const { client, sender } = require("./mail.config")

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.log("Error sending verification email:", error.message)
        throw new Error(`Error sending verification Email: ${error.message}`)
    }
}

const sendWelcomeEmail = async (email, username) => {
    const recipient = [{ email }]

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Welcome Email",
            html: WELCOME_EMAIL_TEMPLATE,
            category: "Welcome Email"
        })

        console.log("Welcome email sent successfully:", response)

    } catch (error) {
        console.log("Error sending welcome email:", error.message)
        throw new Error(`Error sending welcome Email: ${error.message}`)
    }
}

module.exports = {
    sendVerificationEmail,
    sendWelcomeEmail
}