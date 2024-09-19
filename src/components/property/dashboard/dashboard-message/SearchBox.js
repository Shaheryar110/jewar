"use client";
import Image from "next/image";
import React from "react";

const SearchBox = ({ username, err, user, handleSearch, handleSelect }) => {
  return (
    <>
      <form className="d-flex align-items-center">
        <button className="btn">
          <span className="flaticon-search" />
        </button>
        <input
          className="form-control"
          type="search"
          placeholder="Serach"
          aria-label="Search"
          required
          onChange={handleSearch}
          value={username}
        />
      </form>
      {err && <span>User not found!</span>}
      {user && (
        <>
          <div
            onClick={handleSelect}
            className="list-item"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              borderBottom: "1px solid grey",
              paddingBottom: "10px",
            }}
          >
            <a>
              <div className="d-flex align-items-center position-relative">
                <Image
                  width={50}
                  height={50}
                  className="img-fluid float-start rounded-circle mr10"
                  src={
                    user?.photoURL ? user?.photoURL : "/images/inbox/ms3.png"
                  }
                  alt={`${user?.displayName}'s profile`}
                />
                <div className="d-sm-flex">
                  <div className="d-inline-block">
                    <div className="fz14 fw600 dark-color ff-heading mb-0">
                      {user?.displayName}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBox;
