import mongoose from "mongoose";
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email inválido.",
    },
  },
  celular: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "pt-BR");
      },
      message: "Número de telefone inválido.",
    },
  },
  dataNascimento: { type: Date, required: true },
  cpfCnpj: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 11 || value.length === 14;
      },
      message: "O tamanho do CPF/CNPJ deve ser 11 ou 14 dígitos.",
    },
  },
  senha: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
