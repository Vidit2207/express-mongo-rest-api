const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    //yellow-u// Define the Schema Here
  },
  {
    //yellow-u// Options like Timestamps Ho Here
  }
);

const Collection = mongoose.model("-data", Schema);

module.exports = Collection;
