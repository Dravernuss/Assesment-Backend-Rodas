import express from "express";

import { listFavsCtrl } from "../controllers/index.js";

import { validateToken } from "../middlewares/index.js";

const {
  getAllListsFavs,
  getListsFavsByUser,
  getOneListFav,
  createListFav,
  findListFav,
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

router.get(listFavsRoutes.GET_ALL_LISTS_FAVS, validateToken, getAllListsFavs);
router.get(listFavsRoutes.GET_LISTS_BY_USER, validateToken, getListsFavsByUser);
router.get(listFavsRoutes.GET_ONE_LIST_BY_LISTID, validateToken, getOneListFav);
router.post(listFavsRoutes.CREATE, validateToken, createListFav);
router.put(listFavsRoutes.UPDATE, validateToken, findListFav, updateListFav);
router.delete(listFavsRoutes.DELETE, validateToken, deleteListFav);

export default router;
