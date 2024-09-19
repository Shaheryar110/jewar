"use client";
import { auth } from "@/Firebase/Config";
import { SendReview } from "@/services/Review";
import { useContext, useState } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import { RtlContext } from "@/Context/RtlContext";

const ReviewBoxForm = ({ propertyId }) => {
  const { currentRtl } = useContext(RtlContext);
  const { currentUser } = useContext(AuthContext);
  const [review, setReview] = useState({
    email: "",
    title: "",
    rating: "",
    review: "",
  });
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
        propertyId: propertyId,
      };
      SendReview(temp)
        .then((data) => toast.success("Thank You For Submitting Review"))
        .catch((err) => console.log(err));
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
              <label className="fw600 ff-heading mb-2">
                {" "}
                {currentRtl === "ltr" ? "Email" : "بريد إلكتروني"}{" "}
              </label>
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
              <label className="fw600 ff-heading mb-2">
                {" "}
                {currentRtl === "ltr" ? "Title" : "عنوان"}{" "}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  currentRtl === "ltr" ? "Enter Title" : "أدخل العنوان"
                }
                required
                value={review.title}
                onChange={(e) => handleChnage(e, "title")}
              />
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-md-6">
            <div className="widget-wrapper sideborder-dropdown mb-4">
              <label className="fw600 ff-heading mb-2">
                {currentRtl === "ltr" ? "Rating" : "تقييم"}
              </label>
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
              <label className="fw600 ff-heading mb-2">
                {currentRtl === "ltr" ? "Review" : "مراجعة"}
              </label>
              <textarea
                className="pt15"
                rows={6}
                placeholder={
                  currentRtl === "ltr" ? "Write a Review" : "أكتب مراجعة"
                }
                defaultValue={""}
                required
                value={review.review}
                onChange={(e) => handleChnage(e, "review")}
              />
            </div>
            <button type="submit" className="ud-btn btn-white2">
              {currentRtl === "ltr" ? " Submit Review" : "إرسال المراجعة"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
          <ToastContainer
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
          />
        </div>
      </form>
    </>
  );
};

export default ReviewBoxForm;
