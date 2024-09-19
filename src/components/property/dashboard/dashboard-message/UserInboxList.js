import { ChatContext } from "@/Context/ChatContext";
import Image from "next/image";
import React, { useContext } from "react";

const UserItem = ({ chat }) => {
  const { dispatch } = useContext(ChatContext);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="list-item">
      {chat[1]?.userInfo?.displayName && (
        <>
          <a onClick={() => handleSelect(chat[1].userInfo)}>
            <div className="d-flex align-items-center position-relative">
              {console.log(
                chat[1]?.userInfo?.photoURL,
                "chat[1]?.userInfo?.photoURL"
              )}
              <Image
                width={50}
                height={50}
                className="img-fluid float-start rounded-circle mr10"
                src={chat[1]?.userInfo?.photoURL || "/images/inbox/ms3.png"}
                alt={`profile`}
              />
              <div className="d-sm-flex">
                <div className="d-inline-block">
                  <div className="fz14 fw600 dark-color ff-heading mb-0">
                    {chat[1]?.userInfo?.displayName}
                  </div>
                  {chat[1]?.lastMessage?.text && (
                    <p className="preview"> {chat[1]?.lastMessage?.text}</p>
                  )}
                </div>

                {/* <div className="iul_notific">
                {chat[1]?.lastMessage?.text !== undefined && (
                  <div className={`m_notif `}>1</div>
                )}
              </div> */}
              </div>
            </div>
          </a>
          <hr />
        </>
      )}
    </div>
  );
};

const UserInboxList = ({ chats }) => {
  return (
    <>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1]?.date - a[1]?.date)
          .map((chat) => <UserItem key={chat[0]} chat={chat} />)}
    </>
  );
};

export default UserInboxList;
