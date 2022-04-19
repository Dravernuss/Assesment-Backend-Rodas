import express from "express";

import { listFavsCtrl } from "../controllers/index.js";

import { isAuthenticated } from "../middlewares/index.js";

const {
  getAllListsFavs,
  getListsFavsByUser,
  getOneListFav,
  createListFav,
  updateListFav,
  deleteListFav,
} = listFavsCtrl;

const router = express.Router();

const listFavsRoutes = {
  GET_ALL_LISTS_FAVS: "/favs",
  GET_LISTS_BY_USER: "/favs/:id",
  GET_ONE_LIST_BY_LISTID: "/favs/singlelist/:id",
  CREATE: "/favs/create/:id",
  UPDATE: "/favs/update/:id",
  DELETE: "/favs/delete/:id",
};

router.get(listFavsRoutes.GET_ALL_LISTS_FAVS, isAuthenticated, getAllListsFavs);
router.get(
  listFavsRoutes.GET_LISTS_BY_USER,
  isAuthenticated,
  getListsFavsByUser
);
router.get(
  listFavsRoutes.GET_ONE_LIST_BY_LISTID,
  isAuthenticated,
  getOneListFav
);
router.post(listFavsRoutes.CREATE, isAuthenticated, createListFav);
router.put(listFavsRoutes.UPDATE, isAuthenticated, updateListFav);
router.delete(listFavsRoutes.DELETE, isAuthenticated, deleteListFav);

export default router;
