'use client'
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import UserList from "./UserList";
import styles from "@/assets/css/chat/chat.module.css";
import user from "@/assets/img/user.png";
import { StaticImageData } from "next/image";

interface User {
  name: string;
  avatar: StaticImageData;
  messages: { text: string; sender: string; date: string }[];
  id:number
}

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: 1,
      name: "Lara Houns",
      avatar: user,
      messages: [
        { text: "Hello, how are you?", sender: "user", date: "12:30 PM" },
        { text: "I'm doing great, thanks!", sender: "other", date: "12:31 PM" },
      ],
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: user,
      messages: [
        { text: "Hey, what's up?", sender: "user", date: "1:00 PM" },
        { text: "Not much, how about you?", sender: "other", date: "1:02 PM" },
      ],
    },
    {
      id: 3,
      name: "Sophia Walker",
      avatar: user,
      messages: [
        { text: "Good morning!", sender: "user", date: "10:15 AM" },
        { text: "Morning! How's everything?", sender: "other", date: "10:16 AM" },
      ],
    },
    {
      id: 4,
      name: "James Brown",
      avatar: user,
      messages: [
        { text: "Hey, how have you been?", sender: "user", date: "2:00 PM" },
        { text: "I've been doing well, thanks!", sender: "other", date: "2:02 PM" },
      ],
    },
    {
      id: 5,
      name: "Olivia Smith",
      avatar: user,
      messages: [
        { text: "Are we still meeting at 5?", sender: "user", date: "3:30 PM" },
        { text: "Yes, see you then!", sender: "other", date: "3:31 PM" },
      ],
    },
    {
      id: 6,
      name: "Ethan Davis",
      avatar: user,
      messages: [
        { text: "How was your weekend?", sender: "user", date: "6:00 PM" },
        { text: "It was great, thanks for asking!", sender: "other", date: "6:02 PM" },
      ],
    },
    {
      id: 7,
      name: "Emma White",
      avatar: user,
      messages: [
        { text: "Can you help me with the project?", sender: "user", date: "9:00 AM" },
        { text: "Of course, let's meet at noon!", sender: "other", date: "9:02 AM" },
      ],
    },
    {
      id: 8,
      name: "Jack Miller",
      avatar: user,
      messages: [
        { text: "What's up?", sender: "user", date: "11:30 AM" },
        { text: "Not much, just working on some stuff.", sender: "other", date: "11:32 AM" },
      ],
    },
    {
      id: 9,
      name: "Chloe Martinez",
      avatar: user,
      messages: [
        { text: "Hey, when's the meeting?", sender: "user", date: "4:00 PM" },
        { text: "The meeting is at 4:30 PM.", sender: "other", date: "4:02 PM" },
      ],
    },
    {
      id: 10,
      name: "Lucas Taylor",
      avatar: user,
      messages: [
        { text: "Did you get the report?", sender: "user", date: "5:00 PM" },
        { text: "Yes, I sent it earlier.", sender: "other", date: "5:02 PM" },
      ],
    },
    {
      id: 11,
      name: "Ava Anderson",
      avatar: user,
      messages: [
        { text: "Let's catch up soon.", sender: "user", date: "7:00 PM" },
        { text: "Definitely! Let's plan for next week.", sender: "other", date: "7:02 PM" },
      ],
    },
    {
      id: 12,
      name: "Mason Garcia",
      avatar: user,
      messages: [
        { text: "Do you have the data for the presentation?", sender: "user", date: "8:30 AM" },
        { text: "Yes, I will share it with you shortly.", sender: "other", date: "8:32 AM" },
      ],
    },
  ];
  

  const handleCancelChat = () => {
    setSelectedUser(null); 
  };

  return (
    <div className={styles.chat_container}>
      <UserList users={users} onSelectUser={setSelectedUser} selectedUser={selectedUser} /> 
      {selectedUser && <ChatWindow user={selectedUser} onCancel={handleCancelChat} />}
    </div>
  );
};

export default Chat;
