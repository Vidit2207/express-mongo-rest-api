const mongoose = require("mongoose");

const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
const MONGODB_URI = process.env.MONGODB_URI.replace(
  "{{DB_NAME}}",
  MONGODB_DATABASE_NAME
);

const connectToServer = async (app, port) => {
  try {
    const isDBConnected = await mongoose.connect(MONGODB_URI);

    if (!isDBConnected) {
      console.log("MongoDB Connection Failed");
      throw new Error("MongoDB Connection Failed");
    }
    console.log(
      "Connected to MongoDB Server. Database: " + MONGODB_DATABASE_NAME
    );
    const isServerConnected = await app.listen(port);
    if (!isServerConnected) {
      console.log("Server Connection Failed");
      throw new Error("Server Connection Failed");
    }
    console.log("Server is listening at port: " + port);
  } catch (error) {
    console.log("Error in Mongoose Connection");
    console.log(error);
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
      console.log(`Deleted all documents in collection: ${modelName}`);
    }

    console.log("All collections cleared.");
  } catch (error) {
    console.error("Error clearing collections:\n", error);
  }
};

module.exports = { connectToServer, clearAllCollections };
