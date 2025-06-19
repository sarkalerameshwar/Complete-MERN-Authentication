import React from "react";
import {useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
    const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = ()=>{
    console.log(email, password);
    axios.post('http://localhost:5000/login', ({
        email : email,
        password : password
    })).then(res=>{
        console.log(res.data);
        if(res.status === 200){
            alert("Login Success");
            Navigate("/");
            localStorage.setItem("TOKEN", res.data.token);
            localStorage.setItem("EMAIL", res.data.email)
        }
    }).catch(err=>{
        console.log(err);
    })
  }

  return (
    <>
      <h1 className="center"> Login </h1>
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
          to={"/signup"}
        >
          {" "}
          Sign Up{" "}
        </Link>
        <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/forget-password'}> Forget Password </Link>
      </div>
    </>
  );
};

export default Login;
