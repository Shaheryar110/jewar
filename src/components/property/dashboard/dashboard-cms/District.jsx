import { Grid } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { imageUpload } from "@/services/ImageUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Firebase/Config";
import toast from "react-hot-toast";
import { getCmsDistricts } from "@/services/cms";
import { MdDelete, MdEditDocument } from "react-icons/md";

const District = () => {
  const [directions, setDirections] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [addData, setAddData] = useState();
  const [editData, setEditData] = useState();
  const fileInputRef = useRef(null);

  const handleChange = (name, value) => {
    setAddData({
      ...addData,
      [name]: value,
    });
  };
  const handleChangeEdit = (name, value) => {
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const handleUpload = (e, type) => {
    imageUpload(e.target.files[0])
      .then((data) => {
        if (type === "edit") handleChangeEdit("image", data);
        else handleChange("image", data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCmsDistricts()
      .then((data) => {
        setDirections(data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <h4 className="title fz30 mb10 mt20">Change or Add Districts</h4>
      {directions?.length > 0 &&
        directions?.map((direction, index) => (
          <div key={index}>
            <div>
              <div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <h6
                    className="subtitle fz20 mb10 mr20 "
                    style={{ minWidth: 110 }}
                  >
                    {direction.type}
                  </h6>
                  <button
                    className="ud-btn btn-dark mb10 mt10"
                    onClick={() => {
                      setIsOpen(true);
                      handleChange("type", direction.type);
                    }}
                  >
                    Add
                  </button>
                </div>
                <Grid container spacing={2}>
                  {direction?.districts?.map((item, indexDistrict) => (
                    <Grid
                      key={indexDistrict}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        border: "1px solid black",
                        padding: 20,
                        margin: 10,
                        borderRadius: 10,
                      }}
                      item
                    >
                      <Image
                        width={176}
                        height={176}
                        className="cover"
                        src={item.image || "/images/cp-m-1.png"}
                        alt="cities"
                        style={{ borderRadius: "100%" }}
                      />
                      <h6
                        style={{
                          textAlign: "center",
                          alignSelf: "center",
                          marginTop: 4,
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </h6>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          width: "100%",
                        }}
                      >
                        <MdEditDocument
                          size={30}
                          color="#15CDCB"
                          onClick={() => {
                            setEditData({
                              name: item?.name,
                              image: item.image,
                              type: direction.type,
                              index: indexDistrict,
                            });
                            setIsOpenEdit(true);
                          }}
                        />
                        <MdDelete
                          size={30}
                          onClick={async () => {
                            let temp = [...directions];
                            temp[index].districts = temp[
                              index
                            ].districts.filter(
                              (filteritem, filterIndex) =>
                                filterIndex !== indexDistrict
                            );
                            const docRef = doc(db, "Cms", "districtsData");
                            await setDoc(docRef, { data: temp });
                            toast.success("Deleted Succesfully");
                            setDirections(temp);
                          }}
                          color="red"
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        ))}
      <div style={{ display: "flex", flex: 1 }}>
        <Modal
          styles={{
            modal: {
              padding: "50px",
              height: "60%",
              width: "100%",
            },
          }}
          center={true}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div style={{}}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <h4 className="title fz30">
                Add New District In {addData?.type}
              </h4>
              <h4>Image</h4>
              <label className="ud-btn btn-white">
                Browse Files
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  name=""
                  type="file"
                  multiple
                  className="ud-btn btn-white"
                  onChange={(e) => handleUpload(e, "update")}
                  style={{ display: "none" }}
                />
              </label>
              {addData?.image && (
                <div
                  style={{
                    margin: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    width={176}
                    height={176}
                    className="cover"
                    src={addData?.image}
                    alt="cities"
                  />
                </div>
              )}
            </div>
            <h4>Name</h4>

            <input
              type="text"
              className="form-control"
              placeholder="District Name"
              value={addData?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <div
              style={{
                marginTop: 10,
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="ud-btn btn-dark mb10 mt10 "
                onClick={async () => {
                  const temp = [...directions];
                  temp.forEach((item) => {
                    if (item.type === addData.type) {
                      item.districts.push({
                        image: addData.image,
                        name: addData.name,
                      });
                    }
                  });
                  const docRef = doc(db, "Cms", "districtsData");
                  await setDoc(docRef, { data: temp });
                  toast.success("Added Succesfully");
                  setAddData(undefined);
                  setIsOpen(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          styles={{
            modal: {
              padding: "50px",
              height: "60%",
              width: "100%",
            },
          }}
          center={true}
          open={isOpenEdit}
          onClose={() => {
            setIsOpenEdit(false);
          }}
        >
          <div style={{}}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <h4 className="title fz30">
                Add New District In {addData?.type}
              </h4>
              <h4>Image</h4>
              <label className="ud-btn btn-white">
                Browse Files
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  name=""
                  type="file"
                  multiple
                  className="ud-btn btn-white"
                  onChange={(e) => handleUpload(e, "edit")}
                  style={{ display: "none" }}
                />
              </label>
              {editData?.image && (
                <div
                  style={{
                    margin: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    width={176}
                    height={176}
                    className="cover"
                    src={editData?.image}
                    alt="cities"
                  />
                </div>
              )}
            </div>
            <h4>Name</h4>

            <input
              type="text"
              className="form-control"
              placeholder="District Name"
              value={editData?.name || ""}
              onChange={(e) => handleChangeEdit("name", e.target.value)}
            />
            <div
              style={{
                marginTop: 10,
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="ud-btn btn-dark mb10 mt10 "
                onClick={async () => {
                  const temp = [...directions];
                  temp.forEach((item) => {
                    if (item.type === editData.type) {
                      item.districts[editData.index].name = editData.name;
                      item.districts[editData.index].image = editData.image;
                    }
                  });
                  const docRef = doc(db, "Cms", "districtsData");
                  await setDoc(docRef, { data: temp });
                  toast.success("Updated Succesfully");
                  setEditData(undefined);
                  setIsOpenEdit(false);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default District;
