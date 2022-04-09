import mongoose from "mongoose";

// Schema List
const schemaLists = {
  user_id: String,
  name: String,
};

// User model
const List = mongoose.model("List", schemaLists, "lists");

export default List;
