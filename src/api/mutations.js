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
const ADD_SITE = gql`
  mutation addSite($name: String!) {
    addSite(name: $name) {
      name
      siteId
    }
  }
`;
const DESTROY_SITE = gql`
  mutation destroySite($siteId: String!) {
    destroySite(siteId: $siteId)
  }
`;

export default {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  UPDATE_USER_MUTATION,
  ADD_SITE,
  DESTROY_SITE
};
