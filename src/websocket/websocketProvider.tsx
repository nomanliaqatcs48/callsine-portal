import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import ReconnectingWebSocket from "reconnecting-websocket";
import { addUpdatePerson } from "../store/personTrackingReducer"; // Adjust the import path to match the file location

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
  // const socketUrl = `wss://api.callsine.com/ws/users/${id}/`;
  const socketUrl = `wss://api.callsine.com/ws/users/${id}/`;
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleAddUpdatePerson = (
    personId: number,
    finalEmailPosition: number,
    lastEmailPosition: number
  ) => {
    // Dispatching the addUpdatePerson action to add/update the person in the Redux store
    dispatch(
      addUpdatePerson({ personId, finalEmailPosition, lastEmailPosition })
    );
  };

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
      console.log("MESSAGE PAYLOAD", messageData?.notification?.message);
      if (messageData?.notification?.message.event === "set_playbook") {
        const message = messageData?.notification?.message;
        console.log("Prompts LENGTH", message.playbook.prompts.length);
        handleAddUpdatePerson(
          message.data.person,
          message.playbook.prompts.length,
          message.data.position
        );
      }
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
