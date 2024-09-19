const Bathroom = () => {
  const bathOptions = [
    { id: "yany", label: "any" },
    { id: "1", label: "1+" },
    { id: "2", label: "2+" },
    { id: "3", label: "3+" },
    { id: "4", label: "4+" },
    { id: "5", label: "5+" },
  ];

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="ybath"
            type="radio"
            defaultChecked // Set the first option as defaultChecked
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
