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
  res.send({
    message: `Existem ${userList.length} usuários na lista`,
    users: userList,
  });
});

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).send({ message: "Usuário cadastrado com sucesso.", user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: "Email já está cadastrado." });
    }
    return res.status(500).send(error);
  }
});

router.delete("/:userId", async (req, res) => {
  await deleteUser(req.params.userId);
  res.send("Usuário excluído");
});

router.put("/:userId", async (req, res) => {
  await updateUser(req.params.userId, req.body);
  res.send("Dados atualizados");
});

const authenticateUser = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error("Nome de usuário não encontrado");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Senha incorreta");
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
