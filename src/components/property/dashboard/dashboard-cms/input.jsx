import React from "react";

const Input = ({ handleChange, value }) => {
  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder=""
        name="head"
        value={data.head}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
