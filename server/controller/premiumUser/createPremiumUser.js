const User = require('../../models/userModel');
const PremiumUser = require('../../models/premiumUserModel');

exports.createPremiumUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { blockId } = req.body;
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const existingPremiumUser = await PremiumUser.findOne({ userId, blockId });
        if (existingPremiumUser) {
            return res.status(400).json({ message: 'User is already a premium user for this block' });
        }
        const premiumUser = new PremiumUser({
            blockId,
            userId
        });
        await premiumUser.save();
        res.status(200).json({ premiumUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });

    }
};