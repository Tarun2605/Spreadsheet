const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workbookSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    sheets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sheet',
            required: false
        }
    ],
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workbook', workbookSchema);