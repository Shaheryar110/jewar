const SellingList = ({ desc }) => {
  return (
    <div className="list-style1 mb60 mb30-md">
      <ul>
        <li>
          <i className="far fa-check text-white bgc-dark fz15" />
          {desc}
        </li>
      </ul>
    </div>
  );
};

export default SellingList;
