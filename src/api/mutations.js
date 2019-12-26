import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!) {
    signup(email: $email) {
      id
      email
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        isVerified
      }
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $company: String
  ) {
    updateUser(firstName: $firstName, lastName: $lastName, company: $company) {
      id
      email
      firstName
      lastName
      company
    }
  }
`;

export default {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  UPDATE_USER_MUTATION
};
