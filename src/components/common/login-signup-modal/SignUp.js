"use client";
import { signUp } from "@/Firebase/SignUp";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../Firebase/Config";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter();
  const [crediential, setCrediential] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e, feildName) => {
    const temp = e.target.value;
    console.log(feildName, "feildName");
    setCrediential((prev) => ({
      ...prev,
      [feildName]: temp,
    }));
  };

  const handleSubmit = () => {
    if (crediential.email !== "" && crediential.password !== "") {
      signUp(crediential.email, crediential.password).then((data) => {
        router.push("/");
      });
      //     await addDoc(collection(db, "users"), {
      //   email: email,
      //   password: password
      // });
    } else {
      console.log("Fill All Feilds");
    }
  };
  return (
    <form className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          required
          value={crediential.email}
          onChange={(e) => handleOnChange(e, "email")}
        />
      </div>
      {/* End Email */}

      <div className="mb20">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          required
          value={crediential.password}
          onChange={(e) => handleOnChange(e, "password")}
        />
      </div>
      {/* End Password */}

      <div className="d-grid mb20">
        <button
          className="ud-btn btn-thm"
          type="button"
          onClick={() => handleSubmit()}
        >
          Create account <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}
      <p className="dark-color text-center mb0 mt10">
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
