import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import * as userController from "./controllers/user.controller.js";


const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/Authentication").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err.message);
});

app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.post("/send-otp", userController.sendOtp);
app.post("/submit-otp",userController.submitOtp)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
