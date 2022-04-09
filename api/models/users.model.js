import mongoose from "mongoose";

// Schema User
const schemaUsers = {
  email: { type: String, required: true },
  password: String,
};

// User model
const User = mongoose.model("User", schemaUsers, "users");

export default User;
