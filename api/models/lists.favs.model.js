import mongoose from "mongoose";

const { Schema } = mongoose;

const favSchema = new Schema({
  title: String,
  description: String,
  link: String,
});

// Schema ListFav
const schemaListsFav = new Schema({
  name: String,
  user_id: mongoose.SchemaTypes.ObjectId,
  favs: [favSchema],
});

// FavList model
const ListFav = mongoose.model("ListFav", schemaListsFav, "listsfav");

export default ListFav;
