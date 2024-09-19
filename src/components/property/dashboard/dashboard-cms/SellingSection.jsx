"use client";
import { db } from "@/Firebase/Config";
import { getCmsData, getCmsMainData, updateData } from "@/services/cms";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Input from "./input";
import { ListModal } from "./Modal";
import { getselectedUser } from "@/services/user";
import toast from "react-hot-toast";
import MainUser from "./MainUser";
import Ameneties from "./Ameneties";
import District from "./District";
import { RtlContext } from "@/Context/RtlContext";

const SellingSection = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState("");
  const { currentRtl, setCurrentRtl } = useContext(RtlContext);
  const handleOpen = (index) => {
    setOpen(true);
    setIndex(index);
  };

  const [list, setList] = useState([]);
  const [key, setKey] = useState("");
  const [valueEn, setValueEn] = useState("");
  const [valueAr, setValueAr] = useState("");

  const getData = async () => {
    const dataDocs = await getCmsMainData("CmsDataHome");
    setData(dataDocs);
  };

  const getsSelectedData = async () => {
    const dataDocs = await getselectedUser();
    setList(dataDocs.data2);
  };

  const handleChange = (e) => {
    const [parentKey, childKey] = e.target.name.split("."); // Splitting name attribute by period (.)
  
    setData(prevData => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [childKey]: e.target.value  // Update the specific nested property with new value
      }
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateData(data, "CmsDataHome");
      alert("success");
    } catch (error) {
      console.log(error, "err");
    }
  };

  const handleAdd = () => {
    if (!key || !valueEn || !valueAr) {
      return alert("first add fields");
    }
    setData({
      ...data,
      [key]: {en: valueEn, ar:valueAr },
    });
    setKey("");
    setValueEn("");
    setValueAr("");
  };

  const handleList = async (document) => {
    const IndexList = list;
    IndexList[index] = document;

    console.log(IndexList, "IndexList");
    setList(IndexList);
    console.log(document.userId, "doc.userId");

    try {
      const docRef = doc(db, "selectedUser", "Ikke1reOcKPucV1LC3yH");
      await updateDoc(docRef, {
        data2: list,
      });
      toast.success("List Updated Successfully");
    } catch (error) {
      console.error("Error updating order in Firestore", error);
      toast.error("List Update Error");
    }
  };

  useEffect(() => {
    getData();
    getsSelectedData();
  }, []);

  useEffect(() => {
    console.log("formss", data);
  }, [data]);

  



  return (
    <div className="container" dir={currentRtl}>
      <div className="row">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 className="title fz30 mb30">Cms</h4>
          <button className="ud-btn btn-dark" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="col-sm-6 col-xl-12">
          <div className="row">
            <div className="col-sm-4 col-xl-4">
              <label className="heading-color ff-heading fw600 mb10">
                Variable Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <div className="col-sm-4 col-xl-4">
              <label className="heading-color ff-heading fw600 mb10">
                Value (English)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={valueEn}
                onChange={(e) => setValueEn(e.target.value)}
              />
            </div>
            <div className="col-sm-4 col-xl-4">
              <label className="heading-color ff-heading fw600 mb10">
                Value (Arabic)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={valueAr}
                onChange={(e) => setValueAr(e.target.value)}
              />
            </div>
          </div>
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Heading
            </label>
            {Object.keys(data).map((val, index) => {
              return (
                <div style={{ margin: "20px 0px" }} key={index}>
                  <h6>{val}</h6>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="English Value"
                    name={`${val}.en`}
                    value={data[val]?.en || ""}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Arabic Value"
                    name={`${val}.ar`}
                    value={data[val]?.ar || ""}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <button className="ud-btn btn-dark" onClick={handleUpdate}>
          Update
        </button>
      </div>
      {/* <h4 className="title fz30 mb30">Change List Order</h4> */}
      {/* <ListModal
        open={open}
        onClose={() => setOpen(false)}
        handleList={handleList}
      />
      {list?.map(({ displayName }, index) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          key={index}
        >
          <p style={{ width: "10px" }}>{index + 1}</p>
          <p
            style={{
              border: "1px solid black",
              width: "300px",
              height: "30px",
              padding: "3px 15px",
              cursor: "pointer",
            }}
            onClick={() => handleOpen(index)}
          >
            {displayName}
          </p>
        </div>
      ))} */}
      {/* <MainUser /> */}
      <Ameneties />
      <District />
    </div>
  );
};

export default SellingSection;
