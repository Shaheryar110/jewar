"use client";
import { auth } from "@/Firebase/Config";
import { SendReview, SendReviewBlog } from "@/services/Review";
import { useContext, useState } from "react";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/Context/AuthContext";

const ReviewBoxForm = ({ blogId }) => {
  const [review, setReview] = useState({
    email: "",
    title: "",
    rating: "",
    review: "",
  });
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();
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
  const handleChnage = (e, key) => {
    if (key === "rating") {
      setReview({
        ...review,
        [key]: e.value,
      });
    } else {
      setReview({
        ...review,
        [key]: e.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-GB", options);
    if (currentUser) {
      const temp = {
        userId: currentUser?.uid,
        review: review,
        reviewDate: formattedDate,
        blogId: blogId,
      };
      SendReviewBlog(temp)
        .then((data) => {
          setReview({
            email: "",
            title: "",
            rating: "",
            review: "",
          });
        })
        .catch((err) => console.log(err));
      toast.success("Thank You For Submitting Review");
    } else {
      router.push("/login");
    }
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
                onChange={(e) => handleChnage(e, "email")}
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
                value={review.title}
                onChange={(e) => handleChnage(e, "title")}
              />
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-md-6">
            <div className="widget-wrapper sideborder-dropdown mb-4">
              <label className="fw600 ff-heading mb-2">Rating</label>
              <div className="form-style2 input-group">
                <Select
                  value={inqueryType.find(
                    (option) => option.value === review.rating
                  )}
                  onChange={(selectedOption) =>
                    handleChnage(selectedOption, "rating")
                  }
                  defaultValue={[inqueryType[0]]}
                  name="colors"
                  options={inqueryType}
                  styles={customStyles}
                  className="custom-react_select"
                  classNamePrefix="select"
                  required
                  isClearable={false}
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
                value={review.review}
                onChange={(e) => handleChnage(e, "review")}
              />
            </div>
            <button type="submit" className="ud-btn btn-white2">
              Submit Review
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
          {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          /> */}
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default ReviewBoxForm;
