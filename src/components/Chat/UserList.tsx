import React, { useState } from "react";
import styles from "@/assets/css/chat/chat.module.css";
import Image, { StaticImageData } from "next/image";

interface User {
  name: string;
  avatar: StaticImageData;
  messages: { text: string; sender: string; date: string }[];
  id:number
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUser: User | null; 
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, selectedUser }) => {
  const handleSelectUser = (user: User) => {
    onSelectUser(user);
  };

  return (
    <div className={styles.user_list}>
      {users.map((user) => (
        <div
          key={user.id}
          className={`${styles.user_item} ${
            selectedUser?.id === user.id ? styles.selected : ""
          }`}
          onClick={() => handleSelectUser(user)}
        >
          <Image src={user.avatar} alt={user.name} width={50} height={50} />
          <div className="flex flex-col gap-2">
            <h5>{user.name}</h5>
            <p>Amet minim mollit non deseru ...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
