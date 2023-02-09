import User from "../models/users";

const listUsers = async () => {
  const users = await User.find();
  return users;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

const updateUser = async (id, newBody) => {
  await User.findByIdAndUpdate(id, newBody);
};

module.exports = { listUsers, deleteUser, updateUser };
