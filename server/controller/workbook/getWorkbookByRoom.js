const WorkBook = require('../../models/workbookModel');

exports.getWorkbookByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const workbook = await WorkBook.findOne({ roomId });
        if (!workbook) {
            return res.status(404).json({ message: 'Workbook not found' });
        }
        res.status(200).json(workbook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
};