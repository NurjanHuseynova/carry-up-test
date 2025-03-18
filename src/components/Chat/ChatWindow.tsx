import React, { useState, useEffect } from "react";
import styles from "@/assets/css/chat/chat.module.css";
import Image, { StaticImageData } from "next/image";
import EmojiPicker from "emoji-picker-react";
import chat_cancel from "@/assets/img/chat_cancel.svg";
import chat_send from "@/assets/img/chat_send_btn.svg";
import chat_file from "@/assets/img/chat_file.svg";
import chat_emoji from "@/assets/img/chat_emoji.svg";

interface UserListProps {
  user: {
    name: string;
    avatar: StaticImageData;
    messages: { text: string; sender: string; date: string; file?: string }[];
  };
  onCancel: () => void;
}

const ChatWindow: React.FC<UserListProps> = ({ user, onCancel }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(user.messages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    setMessages(user.messages);
    setFile(null); 
  }, [user]);

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleFileClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  const handleSendMessage = () => {
    if ((message.trim() !== "" || file) && (message.trim() !== "" || file)) {
      const newMessage = {
        text: message,
        sender: "user",
        date: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        file: file || "",
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      setFile(null);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <div className="flex gap-4 items-center">
          <Image src={user.avatar} alt={user.name} width={55} height={55} />
          <div>
            <h3>{user.name}</h3>
            <span className="text-[14px]">Online</span>
          </div>
        </div>
        <Image
          src={chat_cancel}
          alt=""
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          onClick={onCancel}
        />
      </div>

      <div className={styles.chat_body}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.user_message : styles.other_message
            }`}
          >
            <div className="flex items-start gap-2">
              {msg.sender === "other" && (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={35}
                  height={35}
                />
              )}
              <div>
                {msg.text && (
                  <p
                    className={
                      msg.sender === "user"
                        ? styles.user_text
                        : styles.other_text
                    }
                  >
                    {msg.text}
                  </p>
                )}
                {msg.file && (
                  <img
                    src={msg.file}
                    alt="file preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <span className={styles.message_date}>{msg.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

     <div className={styles.chat_footer}>
    <div className="flex items-end">
      <div className="relative">
        <Image
          src={chat_emoji}
          alt=""
          width={24}
          height={24}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{ cursor: "pointer" }}
        />
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 shadow-lg border rounded-lg bg-white">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={true}
              searchPlaceholder="Search"
              open={true}
              height={408}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-[10px]"
          onClick={() => setShowEmojiPicker(false)}
          onKeyDown={handleKeyDown}
        />
        {file && (
          <div className="flex items-center gap-2 relative w-12">
            <Image
              src={file}
              alt="file preview"
              style={{
                objectFit: "contain",
              }}
              width={48}
              height={48}
            />
            <button onClick={() => setFile(null)} className="absolute top-0 right-0">
              <Image
                src={chat_cancel}
                alt=""
                width={20}
                height={20}
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
    <div className="flex">
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Image
        src={chat_file}
        alt=""
        width={24}
        height={24}
        onClick={handleFileClick}
        style={{ cursor: "pointer" }}
      />
      <button className="ml-2" onClick={handleSendMessage}>
        <Image src={chat_send} alt="" width={32} height={32} />
      </button>
    </div>
  </div>
    </div>
  );
};

export default ChatWindow;
