// src/components/NotificationListener.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Not = () => {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.on("newNotification", ({ tweet, username }) => {
      if (Notification.permission === "granted") {
        new Notification("🔔 New Tweet Alert!", {
          body: `${username} posted: "${tweet}"`,

        });
      }
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  return null;
};

export default Not;
