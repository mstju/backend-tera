import { Router } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
const router = Router();

const authenticateUser = async (email, senha) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("E-mail não encontrado");
  }

  const isPasswordMatch = await bcrypt.compare(senha, user.senha);
  if (!isPasswordMatch) {
    throw new Error("Senha incorreta");
  }

  return user;
};

router.post("/login", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { email, senha } = req.body;
    console.log("email, senha", email, senha);
    const user = await authenticateUser(email, senha);
    console.log("user", user);
    res.send({ user, message: "Login realizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
});

export default router;
