const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const { transporter, sender } = require('./mail.config')

const sendMail = async ({ to, subject, html, text }) => {
  return await transporter.sendMail({
    from: sender,
    to,
    subject,
    text: text || html.replace(/<[^>]+>/g, "").slice(0, 1000),
    html
  });
}

const sendVerificationEmail = async (email, verificationToken) => {

  try {
    const response = await sendMail({
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replaceAll("%%VERIFICATION_CODE%%", String(verificationToken)),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification email:", error.message);
    throw new Error(`Error sending verification Email: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, username) => {

  try {
    const response = await sendMail({
      from: sender,
      to: email,
      subject: "Welcome Email",
      html: WELCOME_EMAIL_TEMPLATE,
      category: "Welcome Email",
    });

    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.log("Error sending welcome email:", error.message);
    throw new Error(`Error sending welcome Email: ${error.message}`);
  }
};

const sendResetPasswordEmail = async (email, resetUrl) => {

  try {
    const response = await sendMail({
      from: sender,
      to: email,
      subject: "Reset password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replaceAll("%%resetURL%%", resetUrl),
      category: "Password reset",
    });

    console.log("Password reset mail sent successfully:", response);
  } catch (error) {
    console.log("Error in reset password email:", error.message);
    throw new Error(`Error in reset password Email: ${error.message}`);
  }
};

const sendResetSuccessEmail = async (email) => {

  try {
    const response = await sendMail({
      from: sender,
      to: email,
      subject: "Reset password successfull",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset success",
    });

    console.log("Password success mail sent successfully:", response);
  } catch (error) {
    console.log("Error in success password email:", error.message);
    throw new Error(`Error in success password Email: ${error.message}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
};
