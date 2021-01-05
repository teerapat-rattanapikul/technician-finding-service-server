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
      console.log(user);
      req.userID = user.userID;
      req.username = user.username;
      req.userInfoID = user.userInfoID;
      req.firstname = user.firstname;
      req.lastname = user.lastname;
      req.phone = user.phone;
      req.role = user.role;
      req.technicianInfoID = user.technicianInfoID;
      req.chatHistry = user.chatHistry;
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      req.userID = null;
      //error.status = 401;
    }
    //res.json(error);
    next();
  }
};
