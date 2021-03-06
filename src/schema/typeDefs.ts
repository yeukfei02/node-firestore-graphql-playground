import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    signup(data: Signup!): SignupResult!
    login(data: Login!): LoginResult!
    updateUser(id: ID!, data: UpdateUser!): UpdateUserResult!
    deleteUser(id: ID!): DeleteUserResult!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type SignupResult {
    message: String!
  }

  type LoginResult {
    message: String!
    token: String!
  }

  type UpdateUserResult {
    message: String!
  }

  type DeleteUserResult {
    message: String!
  }

  input Signup {
    email: String!
    password: String!
    name: String!
  }

  input Login {
    email: String!
    password: String!
  }

  input UpdateUser {
    email: String!
    password: String!
    name: String!
  }
`;

export default typeDefs;
