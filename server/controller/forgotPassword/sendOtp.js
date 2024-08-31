const crypto = require('crypto');
const sendMail = require('../../utils/nodemailer');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
exports.sendOtp = async (req, res) => {
    try {
        const email = req.user.email;
        const otp = crypto.randomInt(1000000);
        await sendMail({ email, otp, type: 'otp', name: req.user.name });
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        await User.updateOne({ email }, { otp: hashedOtp });
        res.status(200).json({ message: 'Mail sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Mail not sent' });
        console.log(error);
    }
};