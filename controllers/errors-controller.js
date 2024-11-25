exports.handleBadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  if (err.status && err.msg) { // This feels like custom logic as well as server error logic so this could possibly be split into 2 different handlers
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
