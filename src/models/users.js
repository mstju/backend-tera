import mongoose from "mongoose";

const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  password: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "pt-BR");
      },
      message: "Número de telefone inválido.",
    },
  },
  birthDate: { type: Date, required: true },
  zip: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
