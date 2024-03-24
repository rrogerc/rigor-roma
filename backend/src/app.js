require("express-async-errors");

// ----------------------------------------- //

const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

// ----------------------------------------- //

const userRouter = require("./server/userController");
const loginRouter = require("./server/loginController");
const errorHandler = require("./utils/errorHandler");

// ----------------------------------------- //

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

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
