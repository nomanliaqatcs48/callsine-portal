import { useEffect, createContext, ReactNode, useMemo } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

interface WebsocketContextType {
  // Define any context properties you need here
  socket: ReconnectingWebSocket;
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

interface WebsocketProviderProps {
  children: ReactNode;
  userId: string; // Add a userId prop
}

const useWebsocket = (id: string) => {
  // Create a WebSocket connection with a dynamic URL
  const socketUrl = `ws://staging-api.callsine.com/ws/users/${id}/`;
  const socket = useMemo(() => {
    return new ReconnectingWebSocket(socketUrl);
  }, [socketUrl]);

  // Initialize any WebSocket-related logic here
  // For example, handle WebSocket events and manage state

  useEffect(() => {
    // Connect to the WebSocket server when the component mounts
    socket.addEventListener("open", () => {
      console.log("WebSocket connected"); 
    });
 
    // Add a message event listener to handle incoming messages
    socket.addEventListener("message", (event) => {
      console.log("test from receiving socket msg");
      const messageData = JSON.parse(event.data); // Assuming your server sends JSON messages
      console.log("Received message from server:", messageData);
      // alert(messageData)
      // You can handle the incoming message data here, update state, etc.
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, [socket]);

  const contextValue: WebsocketContextType = {
    socket,
  };

  return contextValue;
};

const WebsocketProvider: React.FC<WebsocketProviderProps> = ({
  children,
  userId,
}) => {
  const contextValue = useWebsocket(userId);

  return (
    <WebsocketContext.Provider value={contextValue}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
export { WebsocketContext };
