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

const getAllListsFavs = async (req, res) => {
  try {
    const lists = await ListFav.find();
    if (ListFav.length === 0) res.status(204).send();
    else res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getListsFavsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const lists = await ListFav.find({ user_id: id });
    res.status(200).json({ message: "success", lists });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneListFav = async (req, res) => {
  try {
    const { id: idList } = req.params;
    const list = await ListFav.find({ _id: idList });
    res.json(list);
  } catch (error) {
    res.status(403).json({ error });
  }
};

const createListFav = async (req, res) => {
  try {
    const list = new ListFav(req.body);
    const { name } = req.body;
    const newList = await list.save();
    newList &&
      res
        .status(201)
        .json({ message: `list ${name} created successfully`, newList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addFavToList = async (req, res) => {
  try {
    const favToUpdate = req.body;
    const { id: idListsFav } = req.params;
    const list = await ListFav.findById(idListsFav);
    if (list && favToUpdate) {
      list.favs.push(favToUpdate);
      list &&
        ListFav.updateOne({ _id: list._id }, list, null, (error, result) => {
          !error
            ? res.status(200).json({ message: "success", result })
            : res.status(500).send({ message: "Internal server error" });
        });
    } else return res.status(204).json({ message: "ListFav not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteListFav = async (req, res) => {
  const { id: idList } = req.params;
  try {
    const listToDelete = await ListFav.findById(idList);
    const { name } = listToDelete;

    if (!listToDelete) {
      res.status(204).send({ err: "No list to delete" });
    } else {
      const deletedList = await ListFav.deleteOne(listToDelete);
      if (deletedList)
        res.status(200).send(`ListFav ${name} deleted Successfully`);
    }
  } catch (error) {
    res.status(403).send();
  }
};

ListFav.getAllListsFavs = getAllListsFavs;
ListFav.getListsFavsByUser = getListsFavsByUser;
ListFav.getOneListFav = getOneListFav;
ListFav.createListFav = createListFav;
ListFav.addFavToList = addFavToList;
ListFav.deleteListFav = deleteListFav;

export default ListFav;
