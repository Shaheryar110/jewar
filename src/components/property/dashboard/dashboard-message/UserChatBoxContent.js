import { AuthContext } from "@/Context/AuthContext";
import { ChatContext } from "@/Context/ChatContext";
import { db } from "@/Firebase/Config";
import { getUserById } from "@/services/user";
import { Avatar } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [time, setTime] = useState();
  const ref = useRef();
  const [user, setUser] = useState();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    const now = new Date();
    const seconds = Math.floor((now - message.date.toDate()) / 1000);

    if (seconds < 5) {
      setTime("just now");
    } else if (seconds < 60) {
      setTime(`${seconds} seconds ago`);
    } else if (seconds < 60 * 60) {
      const minutes = Math.floor(seconds / 60);
      setTime(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    } else if (seconds < 60 * 60 * 24) {
      const hours = Math.floor(seconds / (60 * 60));
      setTime(`${hours} hour${hours > 1 ? "s" : ""} ago`);
    } else {
      setTime(message.date.toDate().toLocaleString());
    }
  }, [message.date]);
  useEffect(() => {
    getUserById(currentUser.uid).then((data) => setUser(data));
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        flexDirection:
          message.senderId === currentUser.uid ? "row-reverse" : "row",
      }}
    >
      <div
        className="messageInfo"
        style={{
          display: "flex",
          flexDirection: "column",
          color: "gray",
          fontWeight: 300,
        }}
      >
        <Avatar
          src={
            message?.senderId == currentUser?.uid
              ? user?.photoURL
                ? user?.photoURL
                : user?.displayName[0]
              : data?.user?.photoURL
          }
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          alt="user"
        />
      </div>
      <div
        style={{
          maxWidth: "80%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <p style={{ marginBottom: "0px" }}>{message?.text}</p>
        <span>{time}</span>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  );
};

const UserChatBoxContent = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const unSub = useRef(null);
  useEffect(() => {
    if (data?.chatId) {
      unSub.current = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }
    return () => {
      unSub.current();
    };
  }, [data?.chatId]);

  return (
    <>
      {messages &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
    </>
  );
};

export default UserChatBoxContent;
