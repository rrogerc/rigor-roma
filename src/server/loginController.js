const loginRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./userModel");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const isCorrectPass =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!user || !isCorrectPass)
    return response.status(401).json({
      error: "invalid username or password",
    });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, id: user._id });
});

module.exports = loginRouter;
