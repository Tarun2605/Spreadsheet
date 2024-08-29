import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { spreadSheetFunctionsThroughPut } from './SpreadSheetFunctions';
import { AppContext } from '../Context/AppContext';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [receivedCommand, setReceivedCommand] = useState(null);
    const { spreadsheetRef } = useContext(AppContext);

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

        newSocket.on('recieveCMD', (data) => {
            spreadSheetFunctionsThroughPut(data.message, spreadsheetRef);
            console.log('Command received:', data.message);
            setReceivedCommand(data.message);
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

    const sendCommand = (roomId, workBookId, message) => {
        if (socket) {
            socket.emit('sendCMD', { roomId, workBookId, message });
        }
    };

    const contextValue = useMemo(() => ({
        socket,
        isConnected,
        receivedCommand,
        joinRoom,
        leaveRoom,
        sendCommand,
    }), [socket, isConnected, receivedCommand]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};
