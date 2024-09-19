"use client";
import React, { useState } from "react";

const PaginationTwo = ({ pageNumber, setPageNumber, data, pageCapacity }) => {
  const handlePrevious = () => {
    if (pageNumber == 1) {
    } else {
      setPageNumber((pre) => pre - 1);
    }
  };
  const handleNext = () => {
    if (Math.ceil(data.length / pageCapacity) > pageNumber) {
      setPageNumber((pre) => pre + 1);
    }
  };

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <span className="page-link pointer" href="#" onClick={handlePrevious}>
            <span className="fas fa-angle-left" />
          </span>
        </li>

        <li
          onClick={() => setPageNumber(1)}
          className={pageNumber == 1 ? "active page-item" : "page-item"}
          href="#"
        >
          <span className="page-link pointer">1</span>
        </li>
        {data.length > pageCapacity ? (
          <li
            onClick={() => setPageNumber(2)}
            className={pageNumber == 2 ? "active page-item" : "page-item"}
            href="#"
          >
            <span className="page-link pointer">2</span>
          </li>
        ) : (
          ""
        )}
        {data.length > pageCapacity * 2 ? (
          <li
            onClick={() => setPageNumber(3)}
            className={pageNumber == 3 ? "active page-item" : "page-item"}
            href="#"
          >
            <span className="page-link pointer">3</span>
          </li>
        ) : (
          ""
        )}

        {data.length > pageCapacity * 4 && pageNumber != 4 && <span>...</span>}
        {pageNumber > 3 &&
        Math.ceil(data.length / pageCapacity) != pageNumber ? (
          <li
            className={"active page-item"}
            onClick={() => setPageNumber(Math.ceil(data.length / pageCapacity))}
          >
            <span className="page-link pointer">{pageNumber}</span>
          </li>
        ) : (
          ""
        )}
        {data.length > pageCapacity * 4 ? (
          <li
            className={
              pageNumber == Math.ceil(data.length / pageCapacity)
                ? "active page-item"
                : "page-item"
            }
            onClick={() => setPageNumber(Math.ceil(data.length / pageCapacity))}
          >
            <span className="page-link pointer">
              {Math.ceil(data.length / pageCapacity)}
            </span>
          </li>
        ) : (
          ""
        )}

        <li className="page-item pointer">
          <span className="page-link" href="#" onClick={handleNext}>
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PaginationTwo;
