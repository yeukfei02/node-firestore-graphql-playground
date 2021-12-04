import { GraphQLClient, gql } from 'graphql-request';
import faker from 'faker';

const rootUrl = 'https://node-firestore-gql-playground.herokuapp.com';
const graphQLClient = new GraphQLClient(rootUrl);

const email = faker.internet.email();
const password = 'test';

export const usersTest = (): void => {
  describe('users test', () => {
    test('signup test', async () => {
      const SIGNUP = gql`
        mutation signup($data: Signup!) {
          signup(data: $data) {
            message
          }
        }
      `;
      const variables = {
        data: {
          email: email,
          password: password,
          name: faker.internet.userName(),
        },
      };
      const response = await graphQLClient.request(SIGNUP, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.signup).toBeDefined();
    });

    test('login test', async () => {
      const LOGIN = gql`
        mutation login($data: Login!) {
          login(data: $data) {
            message
            token
            userId
          }
        }
      `;
      const variables = {
        data: {
          email: 'test@email.com',
          password: 'test',
        },
      };
      const response = await graphQLClient.request(LOGIN, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.login).toBeDefined();
      expect(response.login.userId).toBeDefined();
    });

    test('users test', async () => {
      const token = await getToken();

      const USERS = gql`
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
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(USERS, {}, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.users).toBeDefined();
    });

    test('user test', async () => {
      const token = await getToken();
      const userId = await getUserId();

      const USER = gql`
        query user($id: ID!) {
          user(id: $id) {
            id
            email
            password
            name
            createdAt
            updatedAt
          }
        }
      `;
      const variables = { id: userId };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(USER, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.user).toBeDefined();
    });

    test('update user test', async () => {
      const token = await getToken();
      const userId = await getUserId();

      const UPDATE_USER = gql`
        mutation updateUser($id: ID!, $data: UpdateUser!) {
          updateUser(id: $id, data: $data) {
            message
          }
        }
      `;
      const variables = {
        id: userId,
        data: {
          email: 'test888@email.com',
          password: 'test888',
          name: 'test888',
        },
      };
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await graphQLClient.request(UPDATE_USER, variables, headers);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.updateUser).toBeDefined();
    });

    // test('delete user test', async () => {
    //   const token = await getToken('test888@email.com', 'test888');
    //   const userId = await getUserId('test888@email.com', 'test888');

    //   const DELETE_USER = gql`
    //     mutation deleteUser($id: ID!) {
    //       deleteUser(id: $id) {
    //         message
    //       }
    //     }
    //   `;
    //   const variables = {
    //     id: userId,
    //   };
    //   const headers = {
    //     authorization: `Bearer ${token}`,
    //   };
    //   const response = await graphQLClient.request(DELETE_USER, variables, headers);
    //   console.log('response = ', response);

    //   expect(response).toBeDefined();
    //   expect(response.deleteUser).toBeDefined();
    // });
  });
};

async function getToken(emailStr?: string, passwordStr?: string) {
  const LOGIN = gql`
    mutation login($data: Login!) {
      login(data: $data) {
        message
        token
        userId
      }
    }
  `;
  const variables = {
    data: {
      email: emailStr ? emailStr : email,
      password: passwordStr ? passwordStr : password,
    },
  };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const token = response.login.token;
  return token;
}

async function getUserId(emailStr?: string, passwordStr?: string) {
  const LOGIN = gql`
    mutation login($data: Login!) {
      login(data: $data) {
        message
        token
        userId
      }
    }
  `;
  const variables = {
    data: {
      email: emailStr ? emailStr : email,
      password: passwordStr ? passwordStr : password,
    },
  };
  const response = await graphQLClient.request(LOGIN, variables);
  console.log('response = ', response);

  const userId = response.login.userId;
  return userId;
}
