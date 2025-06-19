import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = ()=>{
    console.log(email, password);
    axios.post('http://localhost:5000/signup', ({
        email : email,
        password : password
    })).then(res=>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    })
  }

  return (
    <>
      <h1 className="center"> SIGNUP </h1>
      <div className="outcard">
        Email
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="inputs"
          type="email"
        />{" "}
        <br /> <br />
        Password
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="inputs"
          type="password"
        />{" "}
        <br /> <br />
        <button onClick={handleSubmit} className="btns">
          {" "}
          SUBMIT{" "}
        </button>
        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/login"}
        >
          {" "}
          Log In{" "}
        </Link>
      </div>
    </>
  );
};

export default Signup;
