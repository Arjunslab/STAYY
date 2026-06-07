// backend/emails/templates.js

export const getOtpTemplate = (name, otp, verificationLink) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Verify Your STAYY Account</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:32px;letter-spacing:2px;">
                STAYY
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin-top:0;color:#222;">
                🔒 Verify Your STAYY Account
              </h2>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                Hi ${name},
              </p>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                We received a request to verify your email address.
                Use the OTP below to continue.
              </p>

              <!-- OTP Box -->
              <div style="text-align:center;margin:35px 0;">

                <p style="font-size:14px;color:#777;margin-bottom:15px;">
                  Your One-Time Password
                </p>

                <div style="
                  display:inline-block;
                  background:#f5f5f5;
                  border:1px solid #e0e0e0;
                  border-radius:10px;
                  padding:18px 28px;
                ">
                  <span style="
                    font-size:34px;
                    font-weight:bold;
                    letter-spacing:8px;
                    color:#000000;
                  ">
                    ${OTP}
                  </span>
                </div>

              </div>

              <!-- Verify Button -->
              <div style="text-align:center;margin:35px 0;">
                <a href="${verificationLink}"
                  style="
                    background:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 30px;
                    border-radius:8px;
                    font-weight:bold;
                    display:inline-block;
                    font-size:15px;
                  ">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px;color:#777;line-height:1.6;">
                This OTP expires in <strong>10 minutes</strong>.
              </p>

              <p style="font-size:14px;color:#777;line-height:1.6;">
                If you did not request this verification, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f8f8f8;
              padding:25px;
              text-align:center;
              font-size:12px;
              color:#888;
              line-height:1.6;
            ">
              © 2026 STAYY. All rights reserved.
              <br><br>

              <a href="https://stayy.bajpai.dev"
                style="color:#888;text-decoration:none;">
                stayy.bajpai.dev
              </a>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export const getWelcomeTemplate = (name) => {
  return `
    <<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to STAYY</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          
          <tr>
            <td style="background:#000000;padding:30px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;">STAYY</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin-top:0;color:#222;">
                Welcome to STAYY 🎉
              </h2>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                Hi ${name},
              </p>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                Thanks for joining STAYY! Your account has been created successfully.
              </p>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                We're excited to have you here. Start exploring everything STAYY has to offer.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a href="https://stayy.bajpai.dev"
                   style="background:#000000;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:bold;display:inline-block;">
                  Open STAYY
                </a>
              </div>

              <p style="font-size:14px;color:#777;">
                If you didn't create this account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f8f8;padding:20px;text-align:center;font-size:12px;color:#888;">
              © 2026 STAYY. All rights reserved.
              <br>
              stayy.bajpai.dev
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};