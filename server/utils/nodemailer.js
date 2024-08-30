require('dotenv').config();
const nodemailer = require('nodemailer');

const sendMail = (email, otp) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PW
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'OTP to reset password',
            text: `<html>
            <head>
                <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
                <meta name=Generator content="Microsoft Word 15 (filtered)">
            </head>
        
            <body style="font-family:GuardianEgyp-Light;">
                <table border="0"
                    style="font-family:GuardianEgyp-Light;width:600px;margin: 20px auto 0px auto !important;border: solid 1px #bfbdbd;padding: 20px !important;"
                    align="center">
                    <tr>
                        <td style="vertical-align: top;">
                            <table style="font-family:GuardianEgyp-Light;" width="580" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color:#073262; padding-top: 14px; font-size:22px;vertical-align: top;">
                                        Verify your email with an OTP
                                    </td>
                                    <td style="text-align: right;vertical-align: top;">
                                        <img width="160" src="{logo_url}" align="right">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#798399; padding-top: 0px; line-height: 24px;">
                            <p><b>Hi Tarun,</b></p>
        
                            <p>Your OTP for verification is:</p>
                            <h2 style="color:#073262;">568742</h2>
                            <p>Please enter this OTP to verify your account. The OTP is valid for 10 minutes.</p>
                            <p>If you did not request this OTP, please ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#798399; font-size:15px; padding-top:15px;">
                            <table style="font-family:GuardianEgyp-Light;" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color:#00aed0;">
                                        <h4 style="margin-bottom:8px;">Thank you for using our platform,<br>
                                            Code Geass
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    })
}

module.exports = sendMail;