"use client";
import { agentContactForm } from "@/services/Review";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RtlContext } from "@/Context/RtlContext";
const initial = {
  name: "",
  phone: "",
  email: "",
  message: "",
};
const FormContact = ({ userId }) => {
  const { currentRtl } = useContext(RtlContext);
  const router = useRouter();
  const [formFeilds, setFormFeilds] = useState(initial);
  const handleOnChange = (key, value) => {
    setFormFeilds((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      userId: userId.userId,
      formFeilds,
    };
    agentContactForm(formData).then((data) => {
      setFormFeilds(initial);
      toast.success("Contact Form Submited");
    });
  };
  return (
    <>
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <div className="mb20">
              <input
                type="text"
                className="form-control"
                placeholder={currentRtl === "ltr" ? "Your Name" : "اسمك"}
                required
                value={formFeilds.name}
                onChange={(e) => handleOnChange("name", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-lg-12">
            <div className="mb20">
              <input
                type="text"
                className="form-control"
                placeholder={currentRtl === "ltr" ? "Phone" : "هاتف"}
                required
                value={formFeilds.phone}
                onChange={(e) => handleOnChange("phone", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-md-12">
            <div className="mb20">
              <input
                type="email"
                className="form-control"
                placeholder={
                  currentRtl === "ltr" ? "Email" : "البريد الإلكتروني"
                }
                required
                value={formFeilds.email}
                onChange={(e) => handleOnChange("email", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-md-12">
            <div className="mb10">
              <textarea
                cols={30}
                rows={4}
                placeholder={
                  currentRtl === "ltr"
                    ? "There are many variations of passages."
                    : "توجد العديد من الاختلافات في الفقرات."
                }
                defaultValue={""}
                required
                value={formFeilds.message}
                onChange={(e) => handleOnChange("message", e.target.value)}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-md-12">
            <div className="d-grid">
              <button type="submit" className="ud-btn btn-thm mb15">
                {currentRtl === "ltr" ? "Send Message" : "إرسال رسالة"}
                <i className="fal fa-arrow-right-long" />
              </button>
              <div
                className="ud-btn btn-white2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(
                    `/dashboard-message?data=${JSON.stringify(userId?.userId)}`
                  );
                }}
              >
                {currentRtl === "ltr" ? "Call" : "اتصال"}
                <i className="fal fa-arrow-right-long" />
              </div>
            </div>
          </div>
          {/* End .col-12 */}
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default FormContact;
