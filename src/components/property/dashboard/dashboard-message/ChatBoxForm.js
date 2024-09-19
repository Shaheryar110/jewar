import { AuthContext } from "@/Context/AuthContext";
import { ChatContext } from "@/Context/ChatContext";
import React, { useContext, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "@/Firebase/Config";

const ChatBoxForm = () => {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // console.log(uuid(), "uuid()");
  const handleSend = async () => {
    if (!data.chatId) {
      return; // Exit the function early if chatId is null
    }

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };
  return (
    <form
      className="d-flex align-items-center"
      style={{ gap: "10px" }}
      onSubmit={(e) => {
        e.preventDefault();

        handleSend();
      }}
    >
      <input
        style={{ marginBottom: "10px", height: "60px", padding: "10px" }}
        className="form-control"
        type="search"
        placeholder="Type a Message"
        aria-label="Search"
        required
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
        onSubmit={(e) => e.preventDefault()}
        value={text}
      />
      <div
        className="btn ud-btn btn-thm"
        onClick={handleSend}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FaRegPaperPlane />
      </div>
    </form>
  );
};

export default ChatBoxForm;
