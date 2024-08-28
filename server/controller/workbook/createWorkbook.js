const Workbook = require('../../models/workbookModel');
const User = require('../../models/userModel');
const PremiumUser = require('../../models/premiumUserModel');

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
        if (existingUserWorkbooks.length >= 5 && !premiumUser) {
            return res.status(400).json({ message: 'You have reached the maximum number of workbooks allowed for free users' });
        }
        const newWorkbook = new Workbook({
            createdBy: userId,
            title,
        });
        await newWorkbook.save();
        res.status(200).json({ workbook: newWorkbook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};