import React, { useEffect } from 'react';
import { useSocket } from '../components/SocketContext';

function Notifications() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('newNotification', (data) => {
      console.log("New notification received:", data);

      // Check if the browser supports Notifications API
      if (Notification.permission === 'granted') {
        // Create a new notification
        new Notification('New Notification', {
          body: data.message, // The message you received from the server

        });
      } else if (Notification.permission !== 'denied') {
        // Request permission to show notifications
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('New Notification', {
              body: data.message,
            });
          }
        });
      }
    });

    return () => {
      socket.off('newNotification');
    };
  }, [socket]);

  return (
    <></>
  );
}

export default Notifications;
