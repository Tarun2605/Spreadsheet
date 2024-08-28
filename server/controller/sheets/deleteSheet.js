const Sheet = require('../../models/sheetModel');
const Workbook = require('../../models/workbookModel');
const User = require('../../models/userModel');

exports.deleteSheet = async (req, res) => {
    try {
        const userId = req.user.id;
        const sheetId = req.params.id;
        const sheet = await Sheet.findOneAndDelete({ _id: sheetId, createdBy: userId });
        if (!sheet) {
            return res.status(404).json({ message: 'Sheet not found' });
        }
        if (sheet.createdBy.toString() != userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const workbook = await Workbook.findByIdAndUpdate(sheet.workBookId, { $pull: { sheets: sheetId } }, { new: true });
        const deleteSheet = await Sheet.findByIdAndDelete(sheetId);
        res.status(200).json({ message: 'Sheet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};