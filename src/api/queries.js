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
const FIND_MY_SITES_QUERY = gql`
  {
    findMySites {
      id
      name
      siteId
    }
  }
`;
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
const FIND_DASHBOARD_QUERY = gql`
  query findDashboard($siteId: String!) {
    findDashboard(siteId: $siteId) {
      siteId
      pageViews
      referrers
      languages
    }
  }
`;
const FIND_CHARTS_QUERY = gql`
  query findCharts($siteId: String!, $from: String, $to: String) {
    findCharts(siteId: $siteId, from: $from, to: $to) {
      pageViews
      date
    }
  }
`;
const FIND_THEME = gql`
  query findTheme {
    theme @client
  }
`;

export default {
  FIND_MYSELF_QUERY,
  IS_LOGGED_IN,
  FIND_MY_SITES_QUERY,
  FIND_DASHBOARD_QUERY,
  FIND_CHARTS_QUERY,
  FIND_THEME
};
