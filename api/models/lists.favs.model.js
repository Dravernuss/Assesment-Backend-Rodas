import mongoose from "mongoose";

// Schema ListFav
const schemaListsFav = {
  user_id: String,
  user_email: String,
  name: String,
  title: Array,
  description: Array,
  link: Array,
};

// User model
const ListFav = mongoose.model("ListFav", schemaListsFav, "listsfav");

export default ListFav;
