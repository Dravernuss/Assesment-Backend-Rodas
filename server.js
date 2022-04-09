import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

/**
 * Mongoose
 */

// Connect to db
const dbConnection = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConnection);
// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

/**
 * Express
 */
const app = express();

// Routes
app.get("/", (request, response) => {
  response.send("ASSESMENT BACKEND ESTEBAN RODAS");
});

const PORT = process.env.PORT || 5000;

// Launch server
app.listen(PORT, () => {
  console.log("Initialized server!!");
});
