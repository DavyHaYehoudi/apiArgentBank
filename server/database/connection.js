import mongoose from "mongoose";
const databaseUrl =
  process.env.DATABASE_URL ||
  "mongodb+srv://dsebbah:jsvS864ggavvwQtl@cluster0.mr1hqi2.mongodb.net/";

const dbConnection = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    console.log("Database successfully connected");
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};
export default dbConnection;
