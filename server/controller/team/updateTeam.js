const User = require('../../models/userModel');
const Team = require('../../models/teamModel');

exports.updateTeam = async (req, res) => {
    try {
        const { teamId, name, members } = req.body;
        const user = await User.findById(req.user.id);
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        if (team.admin.toString() != req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        team.name = name;
        team.members = members;
        await team.save();
        res.status(200).json({ team });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};