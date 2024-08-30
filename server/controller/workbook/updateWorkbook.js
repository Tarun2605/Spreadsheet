const User = require('../../models/userModel');
const Workbook = require('../../models/workbookModel');

exports.updateWorkbook = async (req, res) => {
    try {
        const userId = req.user.id;
        const workbookId = req.params.id;
        const { title, sheets, teamId } = req.body;
        const updatedWorkbook = await Workbook.findOneAndUpdate({ _id: workbookId, createdBy: userId }, { title, sheets, teamId }, { new: true });
        if (!updatedWorkbook) {
            return res.status(404).json({ message: 'Workbook not found' });
        }
        res.status(200).json({ workbook: updatedWorkbook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};