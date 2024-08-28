const socketIo = require('socket.io');

const socketHandler = (server) => {
    const io = socketIo(server);

    io.on('connect', (socket) => {
        console.log('New client is connected');
        require('./socketEmit')(socket);
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = socketHandler;
