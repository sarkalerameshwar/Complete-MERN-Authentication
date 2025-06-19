import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    console.log(email);
    axios
      .post("http://localhost:5000/send-otp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          Navigate("/otp");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 className="center"> Forget Password</h1>
      <div className="outcard">
        Email{" "}
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="inputs"
          type="text"
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btns">
          SEND OTP{" "}
        </button>
      </div>
    </>
  );
};

export default ForgetPassword;
