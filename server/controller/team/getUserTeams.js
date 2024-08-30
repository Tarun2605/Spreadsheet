const User = require('../../models/userModel');
const Team = require('../../models/teamModel');

exports.getUserTeams = async (req, res) => {
    try {
        // const user = await User.findById(req.user.id);
        const teams = await Team.find({
            admin: req.user.id
        }).populate('members', 'name email');
        res.status(200).json({ teams });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};