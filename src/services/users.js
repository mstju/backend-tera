import User from "../models/users";
const bcrypt = require("bcrypt");

const listUsers = async () => {
  const users = await User.find();
  return users;
};

const createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.senha = await bcrypt.hash(user.senha, salt);

  const createdUser = await User.create(user);
  return createdUser;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

const updateUser = async (id, newBody) => {
  await User.findByIdAndUpdate(id, newBody);
};

module.exports = { listUsers, createUser, deleteUser, updateUser };
