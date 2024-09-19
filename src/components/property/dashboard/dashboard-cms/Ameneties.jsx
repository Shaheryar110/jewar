import { getAnemeites, updateAmenities } from "@/services/cms";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Ameneties = () => {
  const [ameneties, setAmeneties] = useState();
  const [newAmenities, setNewAmenities] = useState("");
  const handleAmenitesChange = (val, index) => {
    let temp = [...ameneties];
    temp[index].label = val;
    setAmeneties(temp);
  };
  const cocateNewItem = () => {
    if (newAmenities !== "") {
      let temp = [...ameneties];
      temp.push({ defaultChecked: false, label: newAmenities });
      updateAmenities(temp).then(() => {
        setAmeneties(temp);
        setNewAmenities("");
        toast.success("Amenities Updated Successfully");
      });
    }
  };
  const deleteSingleAmenities = (index) => {
    let temp = [...ameneties];
    temp.splice(index, 1);
    updateAmenities(temp).then(() => {
      setAmeneties(temp);
      toast.success("Amenities Updated Successfully");
    });
  };
  useEffect(() => {
    getAnemeites().then((data) => setAmeneties(data));
  }, []);
  return (
    <div>
      <h4 className="title fz30 mb30">Change or Add Amenities</h4>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginLeft: "15px",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Add More Amenities"
          name="head"
          style={{ width: "100%", marginTop: "10px" }}
          value={newAmenities}
          onChange={(e) => setNewAmenities(e.target.value)}
        />
        <button className="ud-btn btn-dark" onClick={cocateNewItem}>
          Add
        </button>
        {ameneties &&
          ameneties.length > 0 &&
          ameneties.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <MdDelete onClick={() => deleteSingleAmenities(index)} />
                <input
                  key={index}
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="head"
                  style={{ width: "100%", marginTop: "10px" }}
                  value={item.label}
                  onChange={(e) => handleAmenitesChange(e.target.value, index)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Ameneties;
