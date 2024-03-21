// For any malfunction just throw an error
// the error will be paased to the next middleware in the chain
// but instead of the immediate next middleware it will go to the error handling middleware (with 4 parameters)
// thus all errors are handled
const functionName = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("functionName threw an error");
    next(error);
  }
};

module.exports = { functionName };
