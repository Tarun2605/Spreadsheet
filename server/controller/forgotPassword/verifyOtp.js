const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
exports.verifyOtp = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;
        const email = req.user.email;
        const user = await User.findOne({ email });
        const isValid = await bcrypt.compare(otp, user.otp);
        if (isValid) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await User.updateOne({ email }, { password: hashedPassword });
            res.status(200).json({ message: 'Password updated successfully' });
        }
        else {
            res.status(400).json({ message: 'Otp not verified' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }
};