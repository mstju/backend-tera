import { Router } from "express";
import User from "../models/users";
import {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/users";
const router = Router();

router.get("/all", async (req, res) => {
  const userList = await listUsers();
  res.send({
    message: `Existem ${userList.length} usuários na lista`,
    users: userList,
  });
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    res.send({ message: "Usuário encontrado.", user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça todos os campos obrigatórios." });
  }

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

export default router;
