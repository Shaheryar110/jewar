const Bedroom = ({ bedOptions, selectedBed, handleBedChange }) => {
  return (
    <>
      {bedOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="xbeds"
            type="radio"
            onChange={() => handleBedChange()}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bedroom;
