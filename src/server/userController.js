const userRouter = require("express").Router();
const User = require("./userModel");
const bcrypt = require("bcrypt");

const userExtractor = require("../utils/userExtractor");

// REMOVE FOR PRODUCTION
userRouter.get("/", async (request, response) => {
  let users = await User.find({});
  // console.log("asasdd");
  response.json(users);
});

userRouter.get("/:id", userExtractor, async (request, response) => {
  if (!request.user || request.user._id.toString() !== request.params.id)
    return response.status(401).send("Unauthorized");

  const id = request.params.id;
  const user = await User.findById(id);
  response.json(user);
});

userRouter.post("/", async (request, response, next) => {
  if (!request.body.password || !request.body.username)
    return response.status(400).send("Missing username or password");
  if (request.body.password.length < 3) {
    const error = new Error("Password must have minimum length of 3");
    error.name = "ValidationError";
    return next(error);
  }

  let user = new User({
    username: request.body.username,
    password: request.body.password,
    rigor: [],
  });

  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);

  await user.save();
  response.status(201).json(user);
});

userRouter.put("/:id/add", userExtractor, async (request, response) => {
  if (!request.user || request.user._id.toString() !== request.params.id)
    return response.status(401).send("Unauthorized");
  if (request.body.minutesFocused < 0)
    return response.status(400).send("Minutes must be positive");

  const minutesFocused = request.body.minutesFocused;
  const user = await User.findById(request.params.id);
  const today = new Date();
  const curDay = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );

  const existingRigor = user.rigor.find((r) => +r.date === +curDay);

  if (existingRigor) {
    existingRigor.minutesFocused += minutesFocused;
  } else {
    user.rigor.push({
      date: curDay,
      minutesFocused: minutesFocused,
    });
  }

  await user.save();
  response.status(200).send("Minutes added successfully!");
});

module.exports = userRouter;
