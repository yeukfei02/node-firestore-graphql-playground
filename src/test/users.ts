import { ApolloServer } from 'apollo-server';
import typeDefs from '../schema/typeDefs';
import resolvers from '../resolvers/resolvers';

import { createTestClient } from 'apollo-server-testing';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { query, mutate } = createTestClient(server);

export const usersTest = (): void => {
  describe('users test', () => {
    test('signup test', async () => {
      const SIGNUP = `
        mutation signup ($data: Signup!) {
          signup (data: $data) {
              message
          }
        }
      `;
      const response = await mutate({
        mutation: SIGNUP,
        variables: {
          data: {
            email: 'test@email.com',
            password: 'test',
            name: 'test',
          },
        },
      });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.signup).toBeDefined();
      expect(response.errors).toBeUndefined();
    });

    test('login test', async () => {
      const LOGIN = `
        mutation login ($data: Login!) {
            login (data: $data) {
                message
                token
            }
        }
      `;
      const response = await mutate({
        mutation: LOGIN,
        variables: {
          data: {
            email: 'test@email.com',
            password: 'test',
          },
        },
      });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.login).toBeDefined();
      expect(response.errors).toBeUndefined();
    });

    test('users test', async () => {
      const USERS = `
        query users {
          users {
              id
              email
              password
              name
              createdAt
              updatedAt
          }
        }
      `;
      const response = await query({ query: USERS, variables: {} });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.users).toBeDefined();
      expect(response.errors).toBeUndefined();
    });

    test('user test', async () => {
      const USER = `
        query user ($id: ID!) {
          user (id: $id) {
              id
              email
              password
              name
              createdAt
              updatedAt
          }
        }
        `;
      const response = await query({ query: USER, variables: { id: '8f83baab-ec65-4005-b37f-b99dabe81609' } });
      console.log('response = ', response);

      // expect(response.data).toBeDefined();
      // expect(response.data.user).toBeDefined();
      // expect(response.errors).toBeUndefined();
    });

    test('update user test', async () => {
      const UPDATE_USER = `
        mutation updateUser ($id: ID!, $data: UpdateUser!) {
          updateUser (id: $id, data: $data) {
              message
          }
        }
      `;
      const response = await mutate({
        mutation: UPDATE_USER,
        variables: {
          data: {
            id: '8f83baab-ec65-4005-b37f-b99dabe81609',
            data: {
              email: 'test888@email.com',
              password: 'test888',
              name: 'test888',
            },
          },
        },
      });
      console.log('response = ', response);

      // expect(response.data).toBeDefined();
      // expect(response.data.updateUser).toBeDefined();
      // expect(response.errors).toBeUndefined();
    });

    test('delete user test', async () => {
      const DELETE_USER = `
        mutation deleteUser ($id: ID!) {
            deleteUser (id: $id) {
                message
            }
        }
      `;
      const response = await mutate({
        mutation: DELETE_USER,
        variables: { id: '8f83baab-ec65-4005-b37f-b99dabe81609' },
      });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.deleteUser).toBeDefined();
      expect(response.errors).toBeUndefined();
    });
  });
};
