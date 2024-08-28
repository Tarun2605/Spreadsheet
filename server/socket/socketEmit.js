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

    socket.on('sendCMD', (data) => {
        const parsedData = (typeof data === 'string') ? JSON.parse(data) : data
        const {roomId, sender, message} = parsedData
        console.log('Message:', roomId, sender, message);
        try {
            socket.to(roomId).emit('recieveCMD', message);
        } catch (error) {
            console.error('Error emitting message:', error);
        }
    });
};

module.exports = socketEmit;
