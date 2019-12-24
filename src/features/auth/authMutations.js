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
      id
      email
      isVerified
    }
  }
`;

export default {
  SIGNUP_MUTATION,
  LOGIN_MUTATION
};
