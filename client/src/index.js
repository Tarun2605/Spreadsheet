import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AxiosWrapperProvider } from './Utils/AxiosWrapper';
import { SocketProvider } from './Utils/SocketWrapper';
import { AppProvider } from './Context/AppContext';
import { StateContextProvider } from './Context/StateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      {/* <StateContextProvider> */}
      <AxiosWrapperProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </AxiosWrapperProvider>
      {/* </StateContextProvider> */}
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
