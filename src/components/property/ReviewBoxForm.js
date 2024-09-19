"use client";
import { agentReview } from "@/services/Review";
import { useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
const initial = {
  email: "",
  title: "",
  rating: "0",
  review: "",
};
const ReviewBoxForm = () => {
  const [reviewFeilds, setReviewFeilds] = useState(initial);
  const handleOnChange = (key, value) => {
    if (key == "rating") {
      setReviewFeilds((prev) => ({
        ...prev,
        [key]: value.value,
      }));
    } else {
      setReviewFeilds((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };
  const inqueryType = [
    { value: "5", label: "Five Star" },
    { value: "4", label: "Four Star" },
    { value: "3", label: "Three Star" },
    { value: "2", label: "Two Star" },
    { value: "1", label: "One Star" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#527FE2"
          : isHovered
          ? "#527FE212"
          : isFocused
          ? "#527FE212"
          : undefined,
      };
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agentReview(reviewFeilds).then((data) => {
      setReviewFeilds(initial);
      toast.success("Review Submited");
    });
  };

  return (
    <>
      <form className="comments_form mt30" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <label className="fw600 ff-heading mb-2">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="ibthemes21@gmail.com"
                required
                value={reviewFeilds.email}
                onChange={(e) => handleOnChange("email", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-md-6">
            <div className="mb-4">
              <label className="fw600 ff-heading mb-2">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                required
                value={reviewFeilds.title}
                onChange={(e) => handleOnChange("title", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-md-6">
            <div className="widget-wrapper sideborder-dropdown mb-4">
              <label className="fw600 ff-heading mb-2">Rating</label>
              <div className="form-style2 input-group">
                <Select
                  defaultValue={[inqueryType[0]]}
                  name="colors"
                  options={inqueryType}
                  styles={customStyles}
                  className="custom-react_select"
                  classNamePrefix="select"
                  required
                  isClearable={false}
                  onChange={(e) => handleOnChange("rating", e)}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-md-12">
            <div className="mb-4">
              <label className="fw600 ff-heading mb-2">Review</label>
              <textarea
                className="pt15"
                rows={6}
                placeholder="Write a Review"
                defaultValue={""}
                required
                value={reviewFeilds.review}
                onChange={(e) => handleOnChange("review", e.target.value)}
              />
            </div>
            <button type="submit" className="ud-btn btn-white2">
              Submit Review
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
          {/* End .col-6 */}
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default ReviewBoxForm;
