import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get all Users *******
export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users.length === 0) response.status(204).send();
    else response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error });
  }
};

// Controller get one User
export const getOneUser = async (req, res) => {
  const { id: idUser } = req.params;
  const user = await User.findById(idUser);
  res.json(user);
};

// Controller create one user
export const createUser = async (req, res) => {
  const { password, email } = req.body;
  const exist_user = await User.findOne({ email: email });
  try {
    // Ensuring that email is not null
    if (!email) {
      console.log("Email cannot be null");
      res.status(403).send("Email cannot be null");
      throw new Error();
    }

    // Ensuring that email format is correct
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.log("Invalid email");
      res.status(403).send("Invalid email");
      throw new Error();
    }

    // Ensuring that email doesn't already exists
    if (exist_user) {
      console.log("Email already exists!");
      res.status(403).send("Email already exists!");
      throw new Error();
    }

    // Ensuring that password is not null
    if (!password) {
      console.log("Password cannot be null");
      res.status(403).send("Password cannot be null");
      throw new Error();
    }

    // Ensuring that password is strong enough
    if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      res.status(403).send("Password must be at least 6 characters");
      throw new Error();
    }

    if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)) {
      console.log(
        "Must have at least 1 uppercase, 1 lowercase letter and 1 number"
      );
      res
        .status(403)
        .send(
          "Must have at least 1 uppercase, 1 lowercase letter and 1 number"
        );
      throw new Error();
    }

    // Encrypting password
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hash });
    const user = await newUser.save();
    user && res.status(201).send(`User ${email} created sucessfully!`);
  } catch (error) {
    res.status(403).send();
  }
};

export const deleteUser = async (req, res) => {
  const { id: idUser } = req.params;
  try {
    const userToDelete = await User.findById(idUser);
    const { email } = userToDelete;

    if (!userToDelete) {
      res.status(204).send({ err: "No user to delete" });
    } else {
      const deletedUser = await User.deleteOne(userToDelete);
      if (deletedUser)
        res.status(200).send(`User ${email} deleted Successfully`);
    }
  } catch (error) {
    res.status(403).send();
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const userDB = await User.findOne({ email });
  if (!userDB) {
    res.status(403).send("User not found!");
    return console.log("User not found!");
  }

  //Validate Hash
  const passToHash = `${password}`;
  bcrypt.compare(passToHash, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid) {
      //JWT
      jwt.sign(
        { email: userDB.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            console.log("Login Sucessfully!");
            res.status(200).json({
              token,
            });
          } else {
            res.status(403).send();
          }
        }
      );
    } else {
      console.log("Invalid Password");
      res.status(403).send("Invalid Password");
    }
  });
};
