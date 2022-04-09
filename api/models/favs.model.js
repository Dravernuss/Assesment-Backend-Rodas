import mongoose from "mongoose";

// Schema List
const schemaFavs = {
  lists_id: String,
  list_name: String,
  user_email: String,
  title: String,
  description: String,
  link: String,
};

// User model
const Favs = mongoose.model("Favs", schemaFavs, "favs");

export default Favs;
