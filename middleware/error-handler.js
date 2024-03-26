const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("From error handler middleware", err);
  return res.status(500).json({ message: err});
}

module.exports = errorHandlerMiddleware;