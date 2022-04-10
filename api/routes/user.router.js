import express from "express";

import { userCtrl } from "../controllers/index.js";

import { isAuthenticated } from "../middlewares/index.js";

const { getAllUsers, getOneUser, createUser, login } = userCtrl;

const router = express.Router();

const userRoutes = {
  GET_ALL_USERS: "/users",
  GET_ONE_USER: "/users/:id",
  CREATE: "/users/create",
  LOGIN: "/users/login",
};

router.get(userRoutes.GET_ALL_USERS, isAuthenticated, getAllUsers);
router.get(userRoutes.GET_ONE_USER, isAuthenticated, getOneUser);
router.post(userRoutes.CREATE, createUser);
router.post(userRoutes.LOGIN, login);

export default router;
