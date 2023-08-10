require("express-async-errors");

// ----------------------------------------- //

const express = require("express");
const cors = require("cors");
const app = express();

// ----------------------------------------- //

const userRouter = require("./server/userController");
const loginRouter = require("./server/loginController");
const errorHandler = require("./utils/errorHandler");

// ----------------------------------------- //

app.use(cors());
app.use(express.json());
app.use(express.static('build'))

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

// ----------------------------------------- //

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

// ----------------------------------------- //
module.exports = app;
