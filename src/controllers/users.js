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
  const {
    nome,
    sobrenome,
    email,
    celular,
    dataNascimento,
    cpfCnpj,
    senha,
    cep,
  } = req.body;
  if (!nome) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça o primeiro nome." });
  }
  if (!sobrenome) {
    return res.status(400).send({ message: "Por favor, forneça o sobrenome." });
  }
  if (!email) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça o endereço de email." });
  }
  if (!celular) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça o número de telefone." });
  }
  if (!dataNascimento) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça a data de nascimento." });
  }
  if (!cpfCnpj) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça o CPF ou CNPJ." });
  }
  if (!senha) {
    return res.status(400).send({ message: "Por favor, forneça a senha." });
  }
  if (!cep) {
    return res.status(400).send({ message: "Por favor, forneça o cep." });
  }

  try {
    const user = new User({
      nome,
      sobrenome,
      email,
      celular,
      dataNascimento,
      cpfCnpj,
      senha,
      cep,
    });
    await user.save();
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
