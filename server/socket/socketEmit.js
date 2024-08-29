const WorkBook = require('../models/workbookModel');
const socketEmit = (socket) => {
    socket.on('joinRoom', async (roomId) => {
        socket.join(roomId);
        console.log('Successfully joined room ' + roomId);
        socket.emit('joinSuccess', { roomId });
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log('Left room ' + roomId);
    });

    socket.on('sendCMD', async (data) => {
        // const parsedData = (typeof data === 'string') ? JSON.parse(data) : data;
        const { roomId, workBookId, message } = data;
        console.log(roomId, workBookId, message);
        try {
            const updatedWorkBook = await WorkBook.findByIdAndUpdate(workBookId, { $push: { timeline: message } }, { new: true });
            console.log('updatedWorkBook:', updatedWorkBook);
            socket.to(roomId).emit('recieveCMD', { message });
        } catch (error) {
            console.error('Error emitting message:', error);
        }
    });
};

module.exports = socketEmit;
