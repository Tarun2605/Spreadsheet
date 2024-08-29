const Users = require('../../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find().select('-password');
        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json({
            users: users
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });

    }
};