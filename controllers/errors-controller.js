exports.handleBadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
