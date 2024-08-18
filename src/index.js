import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './rotues';
import { Provider } from 'react-redux'
import { store } from './redux/store';

import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  // Implement reconnection logic here
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
  if (reason === 'io server disconnect') {
    // The disconnection was initiated by the server, reconnect manually
    socket.connect();
  }
  // Else the socket will automatically try to reconnect
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
