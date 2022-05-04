import { ListFav } from "../models/index.js";

// Controller get all ListsFavs for all users  ************
export const getAllListsFavs = async (req, res) => {
  const resp = ListFav.getAllListsFavs(req, res);
};

// Controller get all ListFav by user ******
export const getListsFavsByUser = async (req, res) => {
  const resp = ListFav.getListsFavsByUser(req, res);
};

// Controller and specific ListFav for an user by ListFav_ID******
export const getOneListFav = async (req, res) => {
  const resp = ListFav.getOneListFav(req, res);
};

// Controller create one ListFav *******
export const createListFav = async (req, res) => {
  const resp = ListFav.createListFav(req, res);
};

// Controller update a ListFav add a new fav in list ****
export const addFavToList = async (req, res) => {
  const resp = ListFav.addFavToList(req, res);
};

// Controller delete a ListFav ******
export const deleteListFav = async (req, res) => {
  const resp = ListFav.deleteListFav(req, res);
};
