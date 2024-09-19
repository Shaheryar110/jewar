import React, { useEffect, useState } from "react";
import { ListModal } from "./Modal";
import { getselectedUser } from "@/services/user";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase/Config";

const MainUser = () => {
  const [list, setList] = useState({});
  const [open, setOpen] = useState(false);
  const getsSelectedData = async () => {
    const dataDocs = await getselectedUser();
    setList(dataDocs.mainUser);
  };
  const handleList = async (document) => {
    setList(document);

    try {
      const docRef = doc(db, "selectedUser", "Ikke1reOcKPucV1LC3yH");
      await updateDoc(docRef, {
        mainUser: document,
      });
      toast.success("User Updated Succesfully");
    } catch (error) {
      console.error("Error updating order in Firestore", error);
      toast.error("User Updated Error");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getsSelectedData();
  }, []);
  return (
    <div>
      <h4 className="title fz30 mb30">Change User</h4>
      <ListModal
        open={open}
        onClose={() => setOpen(false)}
        handleList={handleList}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginLeft: "15px",
        }}
      >
        <p
          style={{
            border: "1px solid black",
            width: "300px",
            height: "30px",
            padding: "3px 15px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          {list?.displayName}
        </p>
      </div>
    </div>
  );
};

export default MainUser;
