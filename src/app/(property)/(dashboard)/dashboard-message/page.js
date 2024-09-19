"use client";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ChatBoxForm from "@/components/property/dashboard/dashboard-message/ChatBoxForm";
import SearchBox from "@/components/property/dashboard/dashboard-message/SearchBox";
import UserChatBoxContent from "@/components/property/dashboard/dashboard-message/UserChatBoxContent";
import UserInboxList from "@/components/property/dashboard/dashboard-message/UserInboxList";
import Image from "next/image";

import { db } from "@/Firebase/Config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { ChatContext } from "@/Context/ChatContext";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { RtlContext } from "@/Context/RtlContext";

const DashboardMessage = () => {
  const searchParams = useSearchParams();
  const { dispatch } = useContext(ChatContext);
  const { currentRtl } = useContext(RtlContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [agents, setAgent] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const { data } = useContext(ChatContext);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (e.target.value) {
      setUsername(e.target.value);
      const q = query(
        collection(db, "users"),
        where("displayName", "==", e.target.value)
      );

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    }
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user?.userId
        ? currentUser.uid + user?.userId
        : user?.userId + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            userInfo: {
              uid: user?.userId,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            date: serverTimestamp(),
          },
        });
        await updateDoc(doc(db, "userChats", user.userId), {
          [combinedId]: {
            userInfo: {
              uid: currentUser?.uid,
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      } else {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.userId,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.userId), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        toast.success("New message Recived!");
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const paramChat = async () => {
    let agent;
    const name = searchParams.get("data");
    const dataa = name.replace(/^"(.*)"$/, "$1");
    if (dataa) {
      const q = query(collection(db, "users"), where("userId", "==", dataa));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dispatch({ type: "CHANGE_USER", payload: doc.data() });
          setAgent((prev) => doc.data());
          agent = doc.data();
        });
      } catch (err) {
        setErr(true);
      }
    }
    const combinedId =
      currentUser.uid > agent?.userId
        ? currentUser.uid + agent?.userId
        : agent?.userId + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId]: {
            userInfo: {
              uid: agent?.userId,
              displayName: agent?.displayName,
              photoURL: agent?.photoURL,
            },
            date: serverTimestamp(),
          },
        });
        await updateDoc(doc(db, "userChats", agent.userId), {
          [combinedId]: {
            userInfo: {
              uid: currentUser?.uid,
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      } else {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: agent.userId,
            displayName: agent.displayName,
            photoURL: agent.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", agent.userId), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    paramChat();
  }, [searchParams]);
  useEffect(() => {
    if (agents) {
    }
    console.log(agents, "sds");
  }, [agents]);
  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="dashboard_title_area" dir={currentRtl}>
                    <h2>{currentRtl === "ltr" ? "Messages" : "رسائل"} </h2>
                    <p className="text">
                      {" "}
                      {currentRtl === "ltr"
                        ? "We are glad to see you again!"
                        : "نحن سعداء لرؤيتك مرة أخرى!"}
                    </p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              <div className="row mb40">
                <div
                  className="col-lg-6 col-xl-5 col-xxl-4"
                  // style={{
                  //   borderLeft: "1px solid grey",
                  //   borderTop: "1px solid grey",
                  //   borderBottom: "1px solid grey",
                  //   borderTopLeftRadius: "10px",
                  //   borderBottomLeftRadius: "10px",
                  // }}
                >
                  <div className="message_container">
                    <div className="inbox_user_list">
                      <div className="iu_heading pr35">
                        <div className="chat_user_search">
                          <SearchBox
                            username={username}
                            user={user}
                            err={err}
                            handleSearch={(e) => handleSearch(e)}
                            handleSelect={() => handleSelect()}
                          />
                        </div>
                      </div>
                      {/* End search box */}

                      <div className="chat-member-list pr20">
                        <UserInboxList chats={chats} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-6 */}

                <div
                  className="col-lg-6 col-xl-7 col-xxl-8"
                  // style={{
                  //   border: "1px solid grey",
                  //   borderTopRightRadius: "10px",
                  //   borderBottomRightRadius: "10px",
                  // }}
                >
                  <div className="message_container mt30-md">
                    <div className="user_heading px-0 mx30">
                      <div className="wrap">
                        <span className="contact-status online" />
                        <Image
                          width={50}
                          height={50}
                          className="img-fluid mr10"
                          src={data?.user?.photoURL || "/images/inbox/ms3.png"}
                          alt="ms3.png"
                        />
                        <div className="meta d-sm-flex justify-content-sm-between align-items-center">
                          <div className="authors">
                            <h6 className="name mt-2">
                              {data?.user?.displayName}
                            </h6>
                          </div>
                          {/* <div>
                            <a
                              className="text-decoration-underline fz14 fw600 dark-color ff-heading"
                              href="#"
                            >
                              Delete Conversation
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {/* End .user_heading */}

                    <div className="inbox_chatting_box">
                      <ul className="chatting_content">
                        <UserChatBoxContent />
                      </ul>
                    </div>
                    {/* End inbox-chatting */}

                    <div className="mi_text">
                      <div className="message_input">
                        <ChatBoxForm />
                      </div>
                    </div>
                    {/* End button */}
                  </div>
                </div>
                {/* End .col-6 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMessage;
