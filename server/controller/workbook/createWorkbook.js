const Workbook = require('../../models/workbookModel');
const User = require('../../models/userModel');
const PremiumUser = require('../../models/premiumUserModel');
const Team = require('../../models/teamModel');
exports.createWorkbook = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const premiumUser = await PremiumUser.findById(userId);
        const existingWorkbook = await Workbook.findOne({ title, createdBy: userId });
        if (existingWorkbook) {
            return res.status(400).json({ message: 'Workbook with this title already exists' });
        }
        const existingUserWorkbooks = await Workbook.find({ createdBy: userId });
        // if (existingUserWorkbooks.length >= 5 && !premiumUser) {
        //     return res.status(400).json({ message: 'You have reached the maximum number of workbooks allowed for free users' });
        // }
        // const team = await Team.create({
        //     name: "default team",
        //     admin: userId,
        // });
        let roomId = "";
        //create room id like eiosd-23j4-23j4
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 12; i++) {
            roomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const newWorkbook = new Workbook({
            createdBy: userId,
            title,
            roomId
        });
        await newWorkbook.save();
        res.status(200).json({ workbook: newWorkbook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};