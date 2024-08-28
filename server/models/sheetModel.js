const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sheetSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    title: {
        type: String,
        required: true
    },
    timeline: [
        {
            data: {
                type: String,
                required: true
            },
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    workBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workbook',
        required: true
    }
});

module.exports = mongoose.model('Sheet', sheetSchema);