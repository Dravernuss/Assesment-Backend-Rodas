import mongoose from "mongoose";

// Schema List
const schemaFavs = {
  lists_id: String,
  title: String,
  description: String,
  link: String,
};

// User model
const Favs = mongoose.model("Favs", schemaFavs, "favs");

export default Favs;
