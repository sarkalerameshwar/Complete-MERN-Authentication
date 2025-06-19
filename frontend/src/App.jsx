import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';
import Signup from "./Components/Signup.jsx";
import Home from "./Components/Home.jsx";
// import {useState} from 'react';
import "./App.css";
import Login from './Components/Login.jsx';
import ForgetPassword from './Components/ForgetPassword.jsx';
import NewSubmit from "./Components/NewSubmit.jsx"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/forget-password' element={<ForgetPassword/>}></Route>
          <Route path='/otp' element={<NewSubmit/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
