import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      _key
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        name
        email
      }
    }
  }
`;
