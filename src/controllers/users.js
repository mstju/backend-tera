import { Router } from "express";
import User from "../models/users";
const bcrypt = require("bcrypt");
import {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/users";
const router = Router();

router.get("/", async (req, res) => {
  const userList = await listUsers();
  res.send(userList);
});

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:userId", async (req, res) => {
  await deleteUser(req.params.userId);
  res.send();
});

router.put("/:userId", async (req, res) => {
  await updateUser(req.params.userId, req.body);
  res.send();
});

const authenticateUser = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error("usuário não encontrado");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("senha incorreta");
  }

  return user;
};

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await authenticateUser(name, password);
    res.send({ user, message: "Login realizado com sucesso" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

export default router;
