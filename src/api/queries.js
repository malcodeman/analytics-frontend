import gql from "graphql-tag";

const FIND_MYSELF_QUERY = gql`
  {
    findMyself {
      id
      email
      isVerified
      firstName
      lastName
      company
      createdAt
    }
  }
`;
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default {
  FIND_MYSELF_QUERY,
  IS_LOGGED_IN
};
