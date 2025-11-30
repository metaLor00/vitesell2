import mongoose from "mongoose";
import winston from "winston";
// Database initialization function

const initDatabase = () => {
mongoose
  .connect("mongodb://localhost:27017/vitesell?replicaSet=rs0")
  .then(() => {
    winston.info("Connected to MongoDB");
  });
};
export default initDatabase;