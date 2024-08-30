const User = require('../../models/userModel');

exports.editUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { profilePic } = req.body;
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: updateUser.profilePic,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};