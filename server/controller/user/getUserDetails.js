const User = require('../../models/userModel');
const WorkBook = require('../../models/workbookModel');
const PremiumUser = require('../../models/premiumUserModel');

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workbooks = await WorkBook.find({ createdBy: userId }).sort({ createdAt: -1 });
        const premiumUser = await PremiumUser.findOne({ userId });

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic
            },
            workbooks,
            premiumUser: premiumUser ? true : false
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });

    }
};