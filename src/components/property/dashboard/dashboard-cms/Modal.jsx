import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { getAllUsers } from "@/services/user";
import Select from "react-select";
export const ListModal = ({ open, onClose, handleList }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const gets = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gets();
  }, []);

  const handleAdd = () => {
    const getFilter = users.filter(
      ({ userId }) => userId === selectedUser.value
    );
    handleList(getFilter[0]);
    setSelectedUser(null);
    onClose();
  };
  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        center={true}
        styles={{ modal: { padding: "50px", height: "400px", width: "400px" } }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h4 className="title fz30 mb30">Select the user</h4>
        </div>

        <Select
          className="select-custom pl-0"
          classNamePrefix="select"
          value={selectedUser}
          onChange={handleUserSelect}
          options={users.map(({ displayName, userId }) => ({
            value: userId,
            label: displayName,
          }))}
        />

        <div
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="ud-btn btn-dark" onClick={handleAdd}>
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};
