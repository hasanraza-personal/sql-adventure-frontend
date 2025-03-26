/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { Context } from "./ContextProvider";

// Create a context for the socket
export const SocketContext = createContext();

// Custom hook to use the Socket context
// export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const { isLogin, user } = useContext(Context);

  useEffect(() => {
    if (!isLogin && !user) {
      return;
    }

    // Establish the socket connection
    const newSocket = io("https://sql-adventure-backend.onrender.com", {
      reconnectionAttempts: 5,
    });
    console.log("newSocket: ", newSocket);

    // Set up connect listener for initial connection
    const connectHandler = () => {
      console.log("user: ", user);
      newSocket.emit("register", { email: user.email });
      setIsSocketConnected(true);
    };
    newSocket.on("connect", connectHandler);

    // Set up disconnect listener
    const disconnectHandler = () => {
      setIsSocketConnected(false);
    };
    newSocket.on("disconnect", disconnectHandler);

    setSocket(newSocket);

    return () => {
      setIsSocketConnected(false);
      newSocket.off("connect", connectHandler);
      newSocket.off("disconnect", disconnectHandler);
      newSocket.disconnect();
    };
  }, [isLogin, user]);

  const value = {
    socket: socket,
    isSocketConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
