const Sheet = require('../../models/sheetModel');
const Workbook = require('../../models/workbookModel');
const User = require('../../models/userModel');
const PremiumUser = require('../../models/premiumUserModel');

exports.createSheet = async (req, res) => {
    try {
        const { title, workBookId } = req.body;
        const userId = req.user.id;
        const workBookExists = await Workbook.findById(workBookId);
        if (!workBookExists) {
            return res.status(400).json({ message: 'Workbook does not exist' });
        }
        const existingSheet = await Sheet.findOne({ title, workBookId });
        if (existingSheet) {
            return res.status(400).json({ message: 'Sheet with this title already exists' });
        }
        const sheet = new Sheet({
            title,
            workBookId,
            createdBy: userId
        });
        await sheet.save();
        const updateWorkBook = await Workbook.findByIdAndUpdate(workBookId, { $push: { sheets: sheet._id } }, { new: true });
        res.status(200).json({ sheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};