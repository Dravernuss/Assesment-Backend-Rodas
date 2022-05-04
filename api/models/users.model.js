import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema User
const schemaUsers = new Schema({
  email: { type: String, required: true },
  password: String,
});

// User model
const User = mongoose.model("User", schemaUsers, "users");

export default User;
