import { ListFav, User } from "../models/index.js";

// Controller get all ListsFavs for all users  ************
export const getAllListsFavs = async (request, response) => {
  try {
    const lists = await ListFav.find();
    if (ListFav.length === 0) response.status(204).send();
    else response.status(200).json(lists);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get all ListFav by user ******
export const getListsFavsByUser = async (req, res) => {
  try {
    const { id: idUser } = req.params;
    const list = await ListFav.find({ user_id: idUser });
    res.json(list);
  } catch (error) {
    res.status(403).json({ error });
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
    const { id: user_id } = req.params;
    const { name: list_name, title, description, link } = req.body;
    const { email: user_email } = await User.findOne({ _id: user_id }); // ACA
    // Ensuring that List Name is not null
    if (!list_name) {
      console.log("List Name cannot be null");
      res.status(403).send("List Name cannot be null");
      throw new Error();
    }

    // Ensuring that List Name is not repeated
    const name_exists = await ListFav.findOne({ name: list_name });
    if (name_exists) {
      console.log("List Name cannot be repeated");
      res.status(403).send("List Name cannot be repeated");
      throw new Error();
    }

    // Ensuring that title, description and link aren't null
    if (!title) {
      console.log("Fav Title cannot be null");
      res.status(403).send("Fav Title cannot be null");
      throw new Error();
    }

    if (!description) {
      console.log("Fav Description cannot be null");
      res.status(403).send("Fav Description cannot be null");
      throw new Error();
    }

    if (!link) {
      console.log("Fav link cannot be null");
      res.status(403).send("Fav link cannot be null");
      throw new Error();
    }

    if (title.length !== description.length || title.length !== link.length) {
      console.log("Data is missing in body");
      res.status(403).send("Data is missing in body");
      throw new Error();
    }

    const list = new ListFav({ ...req.body, user_id, user_email });
    const newList = await list.save();
    newList && res.status(201).json(newList);
  } catch (error) {
    res.status(403).send();
  }
};

export const findListFav = async (req, res, next) => {
  const { id: idList } = req.params;

  try {
    const list = await ListFav.findById(idList);
    if (list) {
      req.data = { list };
      next();
    } else {
      req.status(204).json({ error: "No list founded" });
    }
  } catch (error) {
    res.status(403).send();
  }
};

// Controller update a ListFav
export const updateListFav = async (req, res) => {
  const listToUpdate = req.body;
  const { name, title, description, link } = listToUpdate;
  const { list } = req.data;

  try {
    // Ensuring name Lists can't be changed to empty
    if (!name) {
      console.log("List Name cannot be null");
      res.status(403).send("List Name cannot be null");
      throw new Error();
    }
    //sdads
    if (title.length !== description.length || title.length !== link.length) {
      console.log("Data is missing in body");
      res.status(403).send("Data is missing in body");
      throw new Error();
    }

    ListFav.updateOne(list, listToUpdate, (error, updatedList) => {
      if (!error) {
        res.status(200).json(updatedList);
        console.log(
          "name",
          name,
          "title",
          title,
          "desc",
          description,
          "link",
          link
        );
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controller delete a ListFav ******
export const deleteListFav = async (req, res) => {
  const { id: idList } = req.params;
  try {
    const listToDelete = await ListFav.findById(idList);
    if (!listToDelete) {
      res.status(204).send({ err: "No list to delete" });
    } else {
      const deletedList = await ListFav.deleteOne(listToDelete);
      if (deletedList) res.status(200).json(deletedList);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
