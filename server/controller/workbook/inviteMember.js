const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const sendMail = require('../../utils/nodemailer');
const Workbook = require('../../models/workbookModel');
exports.inviteMember = async (req, res) => {
    try {
        const { email, roomId } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            res.status(200).json({
                message: 'User does not exist'
            });
        }
        const workbook = await Workbook.findOne({
            roomId
        });
        if (!workbook) {
            res.status(400).json({
                message: 'Workbook does not exist'
            });
        }
        await sendMail({
            email,
            type: 'invite',
            name: user.name,
            link: `${process.env.CLIENT_URL}/spreadsheet/${workbook.id}`
        });
        res.status(200).json({
            message: 'Invitation sent successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }
};