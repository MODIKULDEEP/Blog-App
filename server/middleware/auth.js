const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
  const { AuthToken } = req.cookies;
  if (!AuthToken) {
     return next(new ErrorHandler(401, "Please Login to Access this resource"));
   }
  const decodedUserID = jwt.verify(AuthToken, process.env.JWT_SECRET);
  if (!decodedUserID) {
    return next(new ErrorHandler(401, "Please Login to Access this resource"));
  }
  req.userId = decodedUserID.id
  next();
});