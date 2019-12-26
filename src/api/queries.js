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

export default {
  FIND_MYSELF_QUERY
};
