import createUser from './createUser';
import getUser from './getUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import checkDuplicateUser from './checkDuplicateUser';
import loginUser from './loginUser';
import logoutUser from './logOutUser';

export const userManager = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkDuplicateUser,
  loginUser,
  logoutUser,
};
