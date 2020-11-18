import env from 'dotenv';
env.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { createUser, getUserByEmail, getUsers, getUserById, updateUserById, deleteUserById } from '../../model/users';

const resolvers = {
  Query: {
    users: async (root: any, args: any, context: any, info: any): Promise<FirebaseFirestore.DocumentData[]> => {
      const usersList = (await getUsers()) || [];
      return usersList;
    },

    user: async (root: any, args: any, context: any, info: any): Promise<FirebaseFirestore.DocumentData> => {
      let result = {};

      const id = args.id;
      if (id) {
        const user = await getUserById(id);
        if (user) {
          result = user;
        }
      }

      return result;
    },
  },
  Mutation: {
    signup: async (
      root: any,
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
    },

    login: async (
      root: any,
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
          };
        }
      }

      return response;
    },

    updateUser: async (
      root: any,
      args: any,
      context: any,
      info: any,
    ): Promise<{
      message: string;
    }> => {
      let response = {
        message: 'update user fail',
      };

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

      return response;
    },

    deleteUser: async (
      root: any,
      args: any,
      context: any,
      info: any,
    ): Promise<{
      message: string;
    }> => {
      let response = {
        message: 'delete user fail',
      };

      const id = args.id;
      if (id) {
        await deleteUserById(id);
        response = {
          message: 'delete user success',
        };
      }
      return response;
    },
  },
};

export default resolvers;
