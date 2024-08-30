import React, { createContext, useRef, useState } from 'react';

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const spreadsheetRef = useRef(null);

    const contextValue = {
        spreadsheetRef,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};