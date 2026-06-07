// backend/emails/templates.js

export const getOtpTemplate = (name, otp, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>STAYY OTP Verification</title>
    </head>
    <body style="font-family: sans-serif; padding: 20px;">
      <h2>Hello ${name},</h2>
      <p>Your OTP for STAYY verification is:</p>
      <h1 style="background: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 2px;">${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
      <p style="margin-top: 20px;">If required, you can also verify via this link: <a href="${verificationLink}">${verificationLink}</a></p>
    </body>
    </html>
  `;
};

export const getWelcomeTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to STAYY</title>
    </head>
    <body style="font-family: sans-serif; padding: 20px;">
      <h2>Welcome to STAYY 🎉, ${name}!</h2>
      <p>We are excited to have you on board. Your account has been successfully created.</p>
    </body>
    </html>
  `;
};