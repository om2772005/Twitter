// src/components/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a Context for Socket
const SocketContext = createContext();

// Socket Provider to wrap your app and provide socket instance
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to your backend socket server (adjust the URL if needed)
    const socketInstance = io('http://localhost:5000'); // replace with your server URL
    setSocket(socketInstance);

    // Clean up when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

// Custom hook to use socket anywhere in your app
export function useSocket() {
  return useContext(SocketContext);
}
