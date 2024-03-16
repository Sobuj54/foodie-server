import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}`
    );
    console.log("\ndb connection: ", connectionInstance.connection.host);
  } catch (error) {
    console.log("db connection err:", error);
    process.exit(1);
  }
};

export default dbConnection;
