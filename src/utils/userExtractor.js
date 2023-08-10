const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.status(401).json({ error: "token invalid" });
  }
  const token = authorization.replace("Bearer ", "");

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token invalid" });

  request.user = await User.findById(decodedToken.id);
  next();
};

export default userExtractor;
