const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const { client, sender } = require("./mail.config");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification email:", error.message);
    throw new Error(`Error sending verification Email: ${error.message}`);
  }
};

const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
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
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password reset",
    });

    console.log("Password reset mail sent successfully:", response);
  } catch (error) {
    console.log("Error in reset password email:", error.message);
    throw new Error(`Error in reset password Email: ${error.message}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
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
