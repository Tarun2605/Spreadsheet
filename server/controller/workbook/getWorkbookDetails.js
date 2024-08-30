const WorkBook = require('../../models/workbookModel');

exports.getWorkbookDetails = async (req, res) => {
    try {
        const workbookId = req.params.workbookId;
        const workbook = await WorkBook.findById(workbookId).populate('createdBy', 'email name');
        if (!workbook) {
            return res.status(404).json({ error: 'Workbook not found' });
        }
        res.status(200).json(workbook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};