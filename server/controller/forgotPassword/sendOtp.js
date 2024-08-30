const crypto = require('crypto');
const sendMail = require('../../utils/nodemailer');

exports.sendOtp = async (req, res) => {
    try {
        const email = req.body.email;
        const otp = crypto.randomInt(1000000);
        await sendMail(email, otp);
        res.status(200).json({ message: 'Mail sent successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Mail not sent' })
    }
}