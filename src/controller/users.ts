import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { createUser, getUserByEmail, getUsers, getUserById, updateUserById, deleteUserById } from '../model/users';
import { authorize } from '../helpers/helpers';

export const usersControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<FirebaseFirestore.DocumentData[]> => {
  let usersList: any[] = [];

  const token = context.token;
  if (token) {
    const isAuth = await authorize(token);
    if (isAuth) {
      usersList = (await getUsers()) || [];
    }
  }

  return usersList;
};

export const userControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<FirebaseFirestore.DocumentData> => {
  let result = {};

  const token = context.token;
  if (token) {
    const isAuth = await authorize(token);
    if (isAuth) {
      const id = args.id;
      if (id) {
        const user = await getUserById(id);
        if (user) {
          result = user;
        }
      }
    }
  }

  return result;
};

export const signupControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<{
  message: string;
}> => {
  let response = {
    message: 'signup fail',
  };

  const email = args.data.email;
  const password = bcrypt.hashSync(args.data.password, 10);
  const name = args.data.name;

  if (email && password && name) {
    await createUser(email, password, name);
    response = {
      message: 'signup success',
    };
  }

  return response;
};

export const loginControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<{
  message: string;
  token: string;
}> => {
  let response = {
    message: 'login fail',
    token: '',
    userId: '',
  };

  const email = args.data.email;
  const password = args.data.password;

  const user = await getUserByEmail(email);
  if (user) {
    const userPasswordFromDB = user.password;
    const name = user.name;
    if (bcrypt.compareSync(password, userPasswordFromDB)) {
      const token = jwt.sign(
        {
          id: uuidv4(),
          name: name,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );

      response = {
        message: 'login success',
        token: token,
        userId: user.id,
      };
    }
  }

  return response;
};

export const updateUserControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<{
  message: string;
}> => {
  let response = {
    message: 'update user fail',
  };

  const token = context.token;
  if (token) {
    const isAuth = await authorize(token);
    if (isAuth) {
      const id = args.id;
      const email = args.data.email;
      const password = bcrypt.hashSync(args.data.password, 10);
      const name = args.data.name;
      if (id && email && password && name) {
        await updateUserById(id, email, password, name);
        response = {
          message: 'update user success',
        };
      }
    }
  }

  return response;
};

export const deleteUserControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any,
): Promise<{
  message: string;
}> => {
  let response = {
    message: 'delete user fail',
  };

  const token = context.token;
  if (token) {
    const isAuth = await authorize(token);
    if (isAuth) {
      const id = args.id;
      if (id) {
        await deleteUserById(id);
        response = {
          message: 'delete user success',
        };
      }
    }
  }

  return response;
};
