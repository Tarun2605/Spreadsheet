import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket server');
            setIsConnected(false);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const joinRoom = (roomId) => {
        if (socket) {
            socket.emit('joinRoom', roomId);
        }
    };

    const leaveRoom = (roomId) => {
        if (socket) {
            socket.emit('leaveRoom', roomId);
        }
    };

    const sendCommand = (roomId, sender, message) => {
        if (socket) {
            socket.emit('sendCMD', { roomId, sender, message });
        }
    };

    const contextValue = useMemo(() => ({
        socket,
        isConnected,
        joinRoom,
        leaveRoom,
        sendCommand,
    }), [socket, isConnected]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};
