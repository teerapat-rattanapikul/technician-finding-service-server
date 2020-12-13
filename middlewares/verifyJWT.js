const jwt = require("jsonwebtoken");

module.exports = () => (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization === undefined) {
      // res.json("ต้องมี Authorization header");
    } else {
      const token = authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, "secret_key");
      const user = decoded.user;
      req.userID = user.userID;
      req.username = user.username;
      req.userInfoID = user.userInfoID;
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 401;
    }
    res.json(error);
  }
};
