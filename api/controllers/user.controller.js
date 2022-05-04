import { User } from "../models/index.js";

// Controller get all Users *******
export const getAllUsers = async (request, response) => {
  const resp = User.getAllUsers(request, response);
};

// Controller get one User
export const getOneUser = async (req, res) => {
  const resp = User.getOneUser(req, res);
};

// Controller create one user
export const createUser = async (req, res) => {
  const resp = User.createUser(req, res);
};

export const deleteUser = async (req, res) => {
  const resp = User.deleteUser(req, res);
};

export const login = async (req, res) => {
  const resp = User.login(req, res);
};
