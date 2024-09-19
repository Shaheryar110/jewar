"use client";
import {
  SignInApple,
  SignInGoogle,
  facebokSignIn,
  signIn,
} from "@/Firebase/SignUp";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { auth, db } from "../../../Firebase/Config";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "@/Context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (crediential.email !== "" && crediential.password !== "") {
      signIn(crediential.email, crediential.password).then((data) => {
        if (data) {
          toast.success("Login Successfull");
          router.push("/");
        } else {
          toast.error("User Not Found");
        }
      });
      //  await addDoc(collection(db, "users"), {
      //   email: email,
      //   password: password
      // });
    } else {
      console.log("Fill All Feilds");
    }
  };
  const GoogleSignIn = () => {
    SignInGoogle().then((data) => {
      if (currentUser) {
        console.log(currentUser, "on auth");
        setDoc(doc(db, "users", currentUser?.uid), {
          accessToken: currentUser.accessToken || "",
          photoURL: currentUser.photoURL || "",
          displayName: currentUser.displayName || "",
          email: currentUser.email,
          userId: currentUser?.uid,
        })
          .then(() => router.push("/"))
          .catch((err) => {
            console.log(err);
            router.push("/");
          });
      }
    });
  };
  // const AppleSignIn = () => {
  //   SignInApple().then((data) => console.log("data"));
  // };
  // const FacebookSignIn = () => {
  //   facebokSignIn().then((data) => console.log("data"));
  // };
  return (
    <>
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
        {/* End email */}

        <div className="mb15">
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

        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
          <label className="custom_checkbox fz14 ff-heading">
            Remember me
            <input type="checkbox" defaultChecked="checked" />
            <span className="checkmark" />
          </label>
          <a className="fz14 ff-heading" href="#">
            Lost your password?
          </a>
        </div>
        {/* End  Lost your password? */}

        <div className="d-grid mb20">
          <button
            data-bs-dismiss="modal"
            className="ud-btn btn-thm"
            onClick={(e) => handleSubmit(e)}
          >
            Sign in <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End submit */}

        <div className="hr_content mb20">
          <hr />
          <span className="hr_top_text">OR</span>
        </div>

        <div className="d-grid mb10">
          <button
            className="ud-btn btn-white"
            type="button"
            data-bs-dismiss="modal"
            onClick={() => GoogleSignIn()}
          >
            <i className="fab fa-google" /> Continue Google
          </button>
        </div>
        {/* <div className="d-grid mb10">
          <button
            className="ud-btn btn-fb"
            type="button"
            data-bs-dismiss="modal"
            onClick={() => FacebookSignIn()}
          >
            <i className="fab fa-facebook-f" /> Continue Facebook
          </button>
        </div>
        <div className="d-grid mb20">
          <button
            className="ud-btn btn-apple"
            type="button"
            data-bs-dismiss="modal"
            onClick={() => AppleSignIn()}
          >
            <i className="fab fa-apple" /> Continue Apple
          </button>
        </div> */}
        <p className="dark-color text-center mb0 mt10">
          Not signed up?{" "}
          <Link className="dark-color fw600" href="/register">
            Create an account.
          </Link>
        </p>
      </form>
      <Toaster />
    </>
  );
};

export default SignIn;
