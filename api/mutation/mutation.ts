import { mutationField, nonNull, idArg } from 'nexus';
import { SignupResult } from '../types/signupResult';
import { LoginResult } from '../types/loginResult';
import { UpdateUserResult } from '../types/updateUserResult';
import { DeleteUserResult } from '../types/deleteUserResult';

import { Signup } from '../input/signup';
import { Login } from '../input/login';
import { UpdateUser } from '../input/updateUser';
import {
  signupControllerFunc,
  loginControllerFunc,
  updateUserControllerFunc,
  deleteUserControllerFunc,
} from '../../src/controller/users';

export const signup = mutationField('signup', {
  type: nonNull(SignupResult),
  args: { data: nonNull(Signup) },
  resolve: signupControllerFunc,
});

export const login = mutationField('login', {
  type: nonNull(LoginResult),
  args: { data: nonNull(Login) },
  resolve: loginControllerFunc,
});

export const updateUser = mutationField('updateUser', {
  type: nonNull(UpdateUserResult),
  args: { id: nonNull(idArg()), data: nonNull(UpdateUser) },
  resolve: updateUserControllerFunc,
});

export const deleteUser = mutationField('deleteUser', {
  type: nonNull(DeleteUserResult),
  args: { id: nonNull(idArg()) },
  resolve: deleteUserControllerFunc,
});
