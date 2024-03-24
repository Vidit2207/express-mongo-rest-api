const mongoose = require("mongoose");
const { PrismLogger } = require("prism-logger");

const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
const MONGODB_URI = process.env.MONGODB_URI.replace(
  "{{DB_NAME}}",
  MONGODB_DATABASE_NAME
);

const connectToServer = async (app, port) => {
  try {
    const isDBConnected = await mongoose.connect(MONGODB_URI);

    if (!isDBConnected) {
      PrismLogger.error("MongoDB Connection Failed");
      throw new Error("MongoDB Connection Failed");
    }
    PrismLogger.successBg(
      "Connected to MongoDB Server. Database: " + MONGODB_DATABASE_NAME
    );
    const isServerConnected = await app.listen(port);
    if (!isServerConnected) {
      PrismLogger.error("Server Connection Failed");
      throw new Error("Server Connection Failed");
    }
    PrismLogger.successBg("Server is listening at port: " + port);
  } catch (error) {
    PrismLogger.errorBg("Error in Mongoose Connection");
    PrismLogger.error(error);
  }
};

const clearAllCollections = async () => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    for (const collection of collections) {
      const modelName = collection.name;
      const Model = mongoose.model(modelName);

      await Model.deleteMany({});
      PrismLogger.success(`Deleted all documents in collection: ${modelName}`);
    }

    PrismLogger.successBg("All collections cleared.");
  } catch (error) {
    PrismLogger.errorBg("Error clearing collections");
    PrismLogger.error(error);
  }
};

module.exports = { connectToServer, clearAllCollections };
