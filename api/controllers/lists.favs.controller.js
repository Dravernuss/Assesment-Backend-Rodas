import { ListFav } from "../models/index.js";

// Controller get all ListsFavs for all users  ************
export const getAllListsFavs = async (req, res) => {
  try {
    const lists = await ListFav.find();
    if (ListFav.length === 0) res.status(204).send();
    else res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller get all ListFav by user ******
export const getListsFavsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const lists = await ListFav.find({ user_id: id });
    res.status(200).json({ message: "success", lists });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller and specific ListFav for an user by ListFav_ID******
export const getOneListFav = async (req, res) => {
  try {
    const { id: idList } = req.params;
    const list = await ListFav.find({ _id: idList });
    res.json(list);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one ListFav *******
export const createListFav = async (req, res) => {
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

// Controller update a ListFav or add a new fav in list ****
export const addFavToList = async (req, res) => {
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

// Controller delete a ListFav ******
export const deleteListFav = async (req, res) => {
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
