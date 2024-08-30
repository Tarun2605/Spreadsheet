const User = require('../../models/userModel');
const Workbook = require('../../models/workbookModel');

exports.getUserWorkbook = async (req, res) => {
    try {
        const userId = req.user.id;
        const workBooks = await Workbook.find({ createdBy: userId });
        res.status(200).json({ workBooks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};