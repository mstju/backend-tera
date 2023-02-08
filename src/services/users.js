import User from "../models/users";
const bcrypt = require("bcrypt");

export const listUsers = async () => {
  const users = await User.find();
  return users;
};

export const createUser = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const createdUser = await User.create(user);
  return createdUser;
};

export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

export const updateUser = async (id, newBody) => {
  await User.findByIdAndUpdate(id, newBody);
};
