import { useEffect, createContext, ReactNode, useMemo, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

interface WebsocketContextType {
  socket: ReconnectingWebSocket;
  responsePayload: any; // Include responsePayload
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

interface WebsocketProviderProps {
  children: ReactNode;
  userId: string;
}

const useWebsocket = (id: string) => {
  const socketUrl = `ws://api.callsine.com/ws/users/${id}/`;
  const socket = useMemo(() => {
    return new ReconnectingWebSocket(socketUrl);
  }, [socketUrl]);

  const [responsePayload, setResponsePayload] = useState<any>(null);

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
    });

    socket.addEventListener("message", (event) => {
      console.log("test from receiving socket msg");
      const messageData = JSON.parse(event.data);
      // console.log("Received message from server context:", messageData);
      setResponsePayload(messageData); // Update the response payload state with the received data
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const contextValue: WebsocketContextType = {
    socket,
    responsePayload, // Include the response payload in the context value
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
