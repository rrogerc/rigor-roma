require("express-async-errors");

// ------------ Server Import ------------ //
const express = require("express");
const app = express();

// ------------ Middleware ------------ //
const cors = require("cors");
app.use(cors());
app.use(express.json());

// ------------ Router Middleware ------------ //
const userRouter = require("./server/userController");
app.use("/api/users", userRouter);

// ------------ Error Handler ------------ //
const errorHandler = require("./utils/errorHandler");
app.use(errorHandler);

// ------------ Database Connection ------------ //
const { MONGODB_URI } = require("./utils/configuration");
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connection success");
  })
  .catch(() => {
    console.log("connection failed");
  });

// ------------ Export ------------ //
module.exports = app;
