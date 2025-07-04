import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewSubmit = () => {
    const Navigate = useNavigate();
      const [otp, setOtp] = useState("");
      const [password, setPassword] = useState("")
      const handleSubmit = () => {
        console.log(otp, password);
        axios
          .post("http://localhost:5000/submit-otp", {
            otp: otp,
            password : password,
          })
          .then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              Navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
     <>
            <h1 className="center">  FORGET PASSWORD </h1>

            <div className="outcard">
                OTP
                <input
                    style={{ marginBottom: '15px' }}
                    onChange={(e) => {
                        setOtp(e.target.value)
                    }}
                    value={otp}
                    className="inputs"
                    type="text"
                />
                New Password
                <input
                    style={{ marginBottom: '20px' }}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className="inputs"
                    type="text"
                />
                <button
                    onClick={handleSubmit}
                    className="btns"> CHANGE PASSWORD </button>
            </div>
        </>
  )
}

export default NewSubmit