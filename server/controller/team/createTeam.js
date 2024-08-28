const Team = require('../../models/teamModel');
const User = require('../../models/userModel');
const PremiumUser = require('../../models/premiumUserModel');
const { default: mongoose } = require('mongoose');

exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;
        const user = await User.findById(req.user.id);
        await Promise.all(members.map(async (member) => {
            const memberIsValidId = mongoose.Types.ObjectId.isValid(member);
            const user = await User.findOne({
                _id: member
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        ));
        const existingUserTeams = await Team.find({
            admin: user._id
        });
        const isPremium = await PremiumUser.findOne({
            user: user._id
        });
        const team = new Team({
            name,
            members,
            admin: user._id
        });
        await team.save();
        res.status(201).json({ team });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};