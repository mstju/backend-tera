import { Router } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
const router = Router();

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
