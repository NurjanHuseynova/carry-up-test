import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useSignalR = (url: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err) => console.error("SignalR Connection Error: ", err));

    newConnection.on("ReceiveMessage", (sender, text) => {
      setMessages((prev) => [...prev, { sender, text }]);
    });

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [url]);

  const sendMessage = async (sender: string, text: string) => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      await connection.send("SendMessage", sender, text);
    } else {
      console.error("Cannot send message, SignalR is not connected");
    }
  };

  return { messages, sendMessage };
};

export default useSignalR;