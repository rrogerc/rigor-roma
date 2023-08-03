// const config = require("./utils/config"); // .env data

// ------------ Server Import ------------ //
const express = require("express");
const app = express();

// ------------ Middleware Imports ------------ //
require("express-async-errors"); // So no need to catch
const cors = require("cors");

// ------------ Router Middleware ------------ //

// ------------ Database Connection ------------ //


// ------------ Middleware ------------ //
app.use(cors());
app.use(express.json());


// ------------ Export ------------ //
module.exports = app;
