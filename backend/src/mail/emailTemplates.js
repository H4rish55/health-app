const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - VitalIQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1e1e2e, #252545);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #333366;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .logo {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }

        .header-text {
            font-size: 1.3rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
            font-weight: 500;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 1.2rem;
            margin-bottom: 25px;
            color: #e8e8f0;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 35px;
            color: #b8b8c8;
            line-height: 1.7;
        }

        .verification-section {
            background: linear-gradient(145deg, #2a2a4a, #1f1f3a);
            border-radius: 15px;
            padding: 35px;
            text-align: center;
            border: 1px solid #404070;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }

        .verification-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .verification-label {
            font-size: 1.1rem;
            color: #e8e8f0;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .verification-code {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: 8px;
            color: #ffffff;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 20px 0;
            text-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
            position: relative;
            z-index: 2;
        }

        .code-placeholder {
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border: 2px dashed #667eea;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 6px;
            color: #667eea;
        }

        .warning-text {
            font-size: 0.95rem;
            color: #ff9f43;
            margin: 25px 0;
            padding: 15px;
            background: rgba(255, 159, 67, 0.1);
            border-radius: 8px;
            border-left: 4px solid #ff9f43;
        }

        .instructions {
            font-size: 1rem;
            color: #b8b8c8;
            margin: 25px 0;
            line-height: 1.6;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 35px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            margin-top: 20px;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #333366, transparent);
            margin: 30px 0;
        }

        .footer {
            background: #0f0f1f;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333366;
        }

        .footer-text {
            color: #888;
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .signature {
            margin: 25px 0;
            padding: 20px;
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border-radius: 10px;
            border-left: 3px solid #667eea;
        }

        .signature-text {
            color: #e8e8f0;
            font-size: 1rem;
        }

        .team-name {
            color: #667eea;
            font-weight: 600;
        }

        @media (max-width: 480px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 2.2rem;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .verification-section {
                padding: 25px 20px;
            }
            
            .verification-code, .code-placeholder {
                font-size: 2rem;
                letter-spacing: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">VitalIQ</div>
            <div class="header-text">Email Verification Required</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello there! 👋
            </div>
            
            <div class="description">
                Thank you for joining VitalIQ! We're excited to have you on board. To complete your registration and secure your account, please verify your email address using the code below.
            </div>
            
            <div class="verification-section">
                <div class="verification-label">Your Verification Code</div>
                <!-- Use this version when you have the actual code -->
                <!-- <div class="verification-code">{verificationCode}</div> -->
                
                <!-- Placeholder version for demo -->
                <div class="code-placeholder">{verificationCode}</div>
                
                <div class="instructions">
                    Enter this code on the verification page to activate your account and start your health journey with our AI-powered predictions.
                </div>
                
                <a href="#" class="cta-button">Verify Email Now</a>
            </div>
            
            <div class="warning-text">
                ⚠️ <strong>Important:</strong> This verification code will expire in 15 minutes for security reasons. Please complete verification promptly.
            </div>
            
            <div class="divider"></div>
            
            <div class="instructions">
                If you didn't create an account with VitalIQ, you can safely ignore this email. No further action is required, and your email address will not be used.
            </div>
            
            <div class="signature">
                <div class="signature-text">
                    Best regards,<br>
                    The <span class="team-name">VitalIQ Team</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This is an automated security message, please do not reply to this email.<br>
                © 2025 VitalIQ. All rights reserved.
            </div>
        </div>
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
    <title>Password Reset Successful - VitalIQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1e1e2e, #252545);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #333366;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .logo {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }

        .header-text {
            font-size: 1.3rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
            font-weight: 500;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 1.2rem;
            margin-bottom: 25px;
            color: #e8e8f0;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #b8b8c8;
            line-height: 1.7;
        }

        .success-section {
            background: linear-gradient(145deg, #2a2a4a, #1f1f3a);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            border: 1px solid #404070;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }

        .success-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.05), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #4caf50, #45a049);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: white;
            margin-bottom: 20px;
            box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
            position: relative;
            z-index: 2;
            animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .success-title {
            font-size: 1.4rem;
            color: #4caf50;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .success-description {
            font-size: 1rem;
            color: #e8e8f0;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .warning-section {
            background: rgba(255, 159, 67, 0.1);
            border-left: 4px solid #ff9f43;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }

        .warning-title {
            color: #ff9f43;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 10px;
        }

        .warning-text {
            color: #b8b8c8;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .security-tips {
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border: 1px solid #333366;
        }

        .security-title {
            color: #667eea;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .security-list {
            list-style: none;
            padding: 0;
        }

        .security-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 15px;
            color: #b8b8c8;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .security-item::before {
            content: '🔒';
            font-size: 1rem;
            margin-top: 2px;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 35px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            margin: 20px 0;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #333366, transparent);
            margin: 30px 0;
        }

        .footer {
            background: #0f0f1f;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333366;
        }

        .footer-text {
            color: #888;
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .signature {
            margin: 25px 0;
            padding: 20px;
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border-radius: 10px;
            border-left: 3px solid #4caf50;
        }

        .signature-text {
            color: #e8e8f0;
            font-size: 1rem;
        }

        .team-name {
            color: #4caf50;
            font-weight: 600;
        }

        @media (max-width: 480px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 2.2rem;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .success-section {
                padding: 30px 20px;
            }
            
            .success-icon {
                width: 70px;
                height: 70px;
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">VitalIQ</div>
            <div class="header-text">Password Successfully Updated</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello there! 🎉
            </div>
            
            <div class="description">
                Great news! We're writing to confirm that your VitalIQ account password has been successfully updated. Your account is now secured with your new password.
            </div>
            
            <div class="success-section">
                <div class="success-icon">✓</div>
                <div class="success-title">Password Reset Complete!</div>
                <div class="success-description">
                    Your password change has been processed successfully. You can now use your new password to access all VitalIQ features and health predictions.
                </div>
                
                <a href="#" class="cta-button">Access Your Account</a>
            </div>
            
            <div class="warning-section">
                <div class="warning-title">⚠️ Didn't Make This Change?</div>
                <div class="warning-text">
                    If you did not initiate this password reset, please contact our support team immediately. Your account security is our top priority.
                </div>
            </div>
            
            <div class="security-tips">
                <div class="security-title">
                    🛡️ Keep Your Account Secure
                </div>
                <ul class="security-list">
                    <li class="security-item">Use a strong, unique password that combines letters, numbers, and symbols</li>
                    <li class="security-item">Enable two-factor authentication for an extra layer of security</li>
                    <li class="security-item">Avoid using the same password across multiple websites and applications</li>
                    <li class="security-item">Consider using a reputable password manager to generate and store secure passwords</li>
                </ul>
            </div>
            
            <div class="divider"></div>
            
            <div class="description">
                Thank you for taking steps to keep your VitalIQ account secure. We're committed to protecting your health data and personal information with the highest security standards.
            </div>
            
            <div class="signature">
                <div class="signature-text">
                    Best regards,<br>
                    The <span class="team-name">VitalIQ Security Team</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This is an automated security confirmation, please do not reply to this email.<br>
                © 2025 VitalIQ. All rights reserved.
            </div>
        </div>
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
    <title>Reset Your Password - VitalIQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1e1e2e, #252545);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #333366;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .logo {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }

        .header-text {
            font-size: 1.3rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
            font-weight: 500;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 1.2rem;
            margin-bottom: 25px;
            color: #e8e8f0;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #b8b8c8;
            line-height: 1.7;
        }

        .security-notice {
            font-size: 0.95rem;
            color: #ff9f43;
            margin: 25px 0;
            padding: 15px;
            background: rgba(255, 159, 67, 0.1);
            border-radius: 8px;
            border-left: 4px solid #ff9f43;
        }

        .reset-section {
            background: linear-gradient(145deg, #2a2a4a, #1f1f3a);
            border-radius: 15px;
            padding: 35px;
            text-align: center;
            border: 1px solid #404070;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }

        .reset-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .reset-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .reset-title {
            font-size: 1.3rem;
            color: #e8e8f0;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .reset-description {
            font-size: 1rem;
            color: #b8b8c8;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            position: relative;
            z-index: 2;
        }

        .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .expiry-warning {
            font-size: 0.9rem;
            color: #ff6b6b;
            margin: 25px 0;
            padding: 12px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            border-left: 4px solid #ff6b6b;
            text-align: center;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #333366, transparent);
            margin: 30px 0;
        }

        .footer {
            background: #0f0f1f;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333366;
        }

        .footer-text {
            color: #888;
            font-size: 0.85rem;
            line-height: 1.5;
        }

        .signature {
            margin: 25px 0;
            padding: 20px;
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border-radius: 10px;
            border-left: 3px solid #667eea;
        }

        .signature-text {
            color: #e8e8f0;
            font-size: 1rem;
        }

        .team-name {
            color: #667eea;
            font-weight: 600;
        }

        .alternative-text {
            font-size: 0.9rem;
            color: #a8a8b8;
            margin-top: 20px;
            padding: 15px;
            background: rgba(168, 168, 184, 0.05);
            border-radius: 8px;
            line-height: 1.5;
        }

        .link-fallback {
            word-break: break-all;
            color: #667eea;
            text-decoration: underline;
        }

        @media (max-width: 480px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 2.2rem;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .reset-section {
                padding: 25px 20px;
            }
            
            .reset-button {
                padding: 12px 30px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">VitalIQ</div>
            <div class="header-text">Password Reset Request</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello there! 🔐
            </div>
            
            <div class="description">
                We received a request to reset the password for your VitalIQ account. If you didn't make this request, you can safely ignore this email and your password will remain unchanged.
            </div>
            
            <div class="reset-section">
                <div class="reset-icon">🔑</div>
                <div class="reset-title">Reset Your Password</div>
                <div class="reset-description">
                    Click the button below to create a new secure password for your account. You'll be redirected to a secure page where you can set your new password.
                </div>
                
                <a href="{resetURL}" class="reset-button">Reset Password</a>
                
                <div class="alternative-text">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <span class="link-fallback">{resetURL}</span>
                </div>
            </div>
            
            <div class="expiry-warning">
                ⏰ <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons.
            </div>
            
            <div class="security-notice">
                🛡️ <strong>Security Tip:</strong> For your account's safety, we recommend using a strong, unique password that you haven't used elsewhere. Consider using a password manager to generate and store secure passwords.
            </div>
            
            <div class="divider"></div>
            
            <div class="description">
                If you're having trouble accessing your account or didn't request this reset, please contact our support team. We're here to help keep your health data secure.
            </div>
            
            <div class="signature">
                <div class="signature-text">
                    Best regards,<br>
                    The <span class="team-name">VitalIQ Security Team</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This is an automated security message, please do not reply to this email.<br>
                © 2025 VitalIQ. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to VitalIQ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1e1e2e, #252545);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #333366;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .logo {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }

        .tagline {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }

        .content {
            padding: 40px 30px;
        }

        .welcome-text {
            font-size: 1.3rem;
            margin-bottom: 30px;
            color: #e8e8f0;
            text-align: center;
        }

        .description {
            font-size: 1rem;
            margin-bottom: 40px;
            color: #b8b8c8;
            text-align: center;
            line-height: 1.7;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .feature-card {
            background: linear-gradient(145deg, #2a2a4a, #1f1f3a);
            border-radius: 15px;
            padding: 25px 20px;
            text-align: center;
            border: 1px solid #404070;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
            transition: left 0.6s;
        }

        .feature-card:hover::before {
            left: 100%;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .feature-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #ffffff;
        }

        .feature-desc {
            font-size: 0.85rem;
            color: #a8a8b8;
            line-height: 1.4;
        }

        .cta-section {
            text-align: center;
            padding: 30px;
            background: linear-gradient(145deg, #1a1a2e, #252545);
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid #333366;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .footer {
            background: #0f0f1f;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333366;
        }

        .footer-text {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .unsubscribe-link {
            color: #667eea;
            text-decoration: none;
            font-size: 0.85rem;
            transition: color 0.3s ease;
        }

        .unsubscribe-link:hover {
            color: #8fa2ff;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #333366, transparent);
            margin: 30px 0;
        }

        @media (max-width: 480px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 2.2rem;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">VitalIQ</div>
            <div class="tagline">Your AI-Powered Health Guardian</div>
        </div>
        
        <div class="content">
            <div class="welcome-text">
                Welcome to the future of preventive healthcare! 🚀
            </div>
            
            <div class="description">
                You've just joined thousands of users who are taking control of their health with cutting-edge AI technology. VitalIQ uses advanced machine learning models to help predict and prevent serious health conditions before they become critical.
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🧠</div>
                    <div class="feature-title">Stroke Prediction</div>
                    <div class="feature-desc">Advanced AI analysis to assess stroke risk factors and provide early warnings</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">❤️</div>
                    <div class="feature-title">Heart Failure Detection</div>
                    <div class="feature-desc">Advanced AI monitoring to detect early signs of heart failure and cardiac complications</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🩺</div>
                    <div class="feature-title">Diabetes Prediction</div>
                    <div class="feature-desc">Smart glucose and metabolic health monitoring with predictive insights</div>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="cta-section">
                <h3 style="margin-bottom: 15px; color: #ffffff;">Ready to start your health journey?</h3>
                <p style="margin-bottom: 25px; color: #b8b8c8;">Get your first AI health assessment and discover what your data reveals about your health.</p>
                <a href="#" class="cta-button">Start Health Assessment</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                Stay healthy and informed with VitalIQ<br>
                © 2025 VitalIQ. All rights reserved.
            </div>
            <a href="#" class="unsubscribe-link">Unsubscribe from these emails</a>
        </div>
    </div>
</body>
</html>
`

module.exports = {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
}