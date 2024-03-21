const handleError = (error, req, res, next) => {
  try {
    console.log(error);
    res.status(error.status || 400).send({
      status: false,
      message: error.message || "Internal Server Error",
    });
  } catch (err) {
    console.log("Error -> " + err);
  }
};

module.exports = { handleError };
