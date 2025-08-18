const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Welcome to VitalIQ</title>
  <!--[if mso]>
  <xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  <![endif]-->
  <style>
    /* Mobile tweaks */
    @media screen and (max-width:600px){
      .container{width:100%!important}
      .px{padding-left:16px!important;padding-right:16px!important}
      .py{padding-top:16px!important;padding-bottom:16px!important}
      .stack{display:block!important;width:100%!important}
    }
    /* Optional dark-mode hint for clients that honor it */
    @media (prefers-color-scheme: dark){
      body{background:#0b1020!important}
      .card{background:#0f172a!important;color:#e5e7eb!important}
      .muted{color:#a1a1aa!important}
      .divider{background:#20304a!important}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0e1220;">
  <!-- preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    Welcome {{USER_NAME}} — your VitalIQ health dashboard is ready.
  </div>

  <center style="width:100%;background:#0e1220;padding:24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <!-- container -->
          <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
            <!-- header / logo -->
            <tr>
              <td class="px" style="padding:12px 24px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td align="left">
                      <a href="{{APP_URL}}" target="_blank">
                        <img src="{{LOGO_URL}}" alt="VitalIQ" width="160" style="display:block;border:0;outline:none;">
                      </a>
                    </td>
                    <td align="right" style="font:600 13px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                      <a href="{{APP_URL}}" style="color:#a5f3fc;text-decoration:none;">Open App</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- hero card -->
            <tr>
              <td class="px" style="padding:0 24px 24px 24px;">
                <table role="presentation" width="100%" class="card" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,.35);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#16a34a 0%,#06b6d4 100%);padding:32px;">
                      <table role="presentation" width="100%">
                        <tr>
                          <td align="left" class="stack">
                            <h1 style="margin:0;font:800 28px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;">
                              Welcome, {{USER_NAME}} 👋
                            </h1>
                            <p style="margin:10px 0 0 0;font:400 16px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#e6fffb;">
                              Thanks for joining <strong>VitalIQ</strong> — your smart hub for heart, diabetes, and stroke risk insights.
                            </p>
                          </td>
                          <td align="right" class="stack" style="width:140px;">
                            <img src="{{MARK_ICON_URL}}" width="120" alt="VitalIQ icon" style="display:block;border-radius:14px;">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- body -->
                  <tr>
                    <td class="py px" style="padding:24px;">
                      <p style="margin:0 0 12px 0;font:400 16px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#e5e7eb;">
                        Here’s what you can do with VitalIQ:
                      </p>

                      <!-- features -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="stack" valign="top" style="width:50%;padding-right:10px;">
                            <table role="presentation" width="100%">
                              <tr>
                                <td style="background:#0f172a;border-radius:12px;padding:12px;">
                                  <strong style="color:#ffffff;font:600 15px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">Predict & Track</strong>
                                  <p style="margin:6px 0 0 0;color:#94a3b8;font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                                    Run risk checks in seconds; results are saved to your personal history.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="stack" valign="top" style="width:50%;padding-left:10px;">
                            <table role="presentation" width="100%">
                              <tr>
                                <td style="background:#0f172a;border-radius:12px;padding:12px;">
                                  <strong style="color:#ffffff;font:600 15px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">Insights that Matter</strong>
                                  <p style="margin:6px 0 0 0;color:#94a3b8;font:400 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                                    Understand which factors drive your score and get simple, actionable tips.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA button -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
                        <tr>
                          <td align="center">
                            <!--[if mso]>
                              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{{PRIMARY_CTA_URL}}"
                                style="height:50px;v-text-anchor:middle;width:260px;" arcsize="12%" stroke="f" fillcolor="#10b981">
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:Segoe UI, Arial, sans-serif;font-size:16px;font-weight:700;">
                                  Open VitalIQ
                                </center>
                              </v:roundrect>
                            <![endif]-->
                            <a href="{{PRIMARY_CTA_URL}}"
                               style="background:#10b981;border-radius:10px;color:#ffffff;display:inline-block;font:700 16px/50px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;text-align:center;width:260px;text-decoration:none;">
                              Open VitalIQ
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="padding-top:10px;">
                            <p style="margin:0;color:#94a3b8;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                              Can’t click the button? Copy this link:<br>
                              <a href="{{PRIMARY_CTA_URL}}" style="color:#67e8f9;text-decoration:none;word-break:break-all;">{{PRIMARY_CTA_URL}}</a>
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- divider -->
                      <div class="divider" style="height:1px;background:#1f2937;margin:24px 0;"></div>

                      <!-- quick facts -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="color:#cbd5e1;font:400 13px/1.7 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                            • Private by default — your data stays encrypted.<br>
                            • Works on mobile and desktop.<br>
                            • Need help? Reach us at <a href="mailto:{{SUPPORT_EMAIL}}" style="color:#67e8f9;text-decoration:none;">{{SUPPORT_EMAIL}}</a>.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- footer -->
                  <tr>
                    <td style="background:#0b1324;padding:16px 24px;border-radius:0 0 16px 16px;">
                      <table role="presentation" width="100%">
                        <tr>
                          <td class="muted" style="color:#94a3b8;font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                            You’re receiving this because you created an account on VitalIQ.
                            If this wasn’t you, ignore this email or contact support.
                          </td>
                          <td align="right" class="stack" style="font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                            <a href="{{UNSUBSCRIBE_URL}}" style="color:#67e8f9;text-decoration:none;">Unsubscribe</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- address -->
            <tr>
              <td class="px" style="padding:8px 24px 0 24px;">
                <p style="margin:0;color:#64748b;text-align:center;font:400 11px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                  © {{YEAR}} VitalIQ • {{COMPANY_ADDRESS}}
                </p>
              </td>
            </tr>

            <!-- spacer -->
            <tr><td style="height:24px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>

`

module.exports = {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
}