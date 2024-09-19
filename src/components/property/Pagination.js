"use client";
import React, { useState } from "react";

const Pagination = (dataLength) => {
  const totalPages = dataLength > 4 ? dataLength / 4 : 1;
  const [currentPage, setCurrentPage] = useState(1); // Initialize the current page state to 2 (or any other default active page)

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // Here you can add additional logic to handle what happens when the user clicks on a page number.
    // For example, you can fetch data corresponding to the selected page from the server or update the URL.
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // You can set the maximum number of page numbers to show in the pagination

    const startPage = Math.max(1, currentPage - Math.floor(dataLength / 2));
    const endPage = Math.min(totalPages, startPage + dataLength - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const renderPageNumbers = generatePageNumbers().map((page) => (
    <li
      key={page}
      className={`page-item${page === currentPage ? " active" : ""}`}
    >
      <span
        className="page-link pointer"
        href="#"
        onClick={() => handlePageClick(page)}
      >
        {page}
      </span>
    </li>
  ));

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <span
            className="page-link pointer"
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span className="fas fa-angle-left" />
          </span>
        </li>
        {renderPageNumbers}
        <li className="page-item pointer">
          <span
            className="page-link"
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
