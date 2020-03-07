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
      name
      siteId
      domain
      uniqueVisits
      pageViews
      bounceRate
    }
  }
`;
const FIND_SITE_QUERY = gql`
  query findSite($siteId: String!) {
    findSite(siteId: $siteId) {
      name
      siteId
      domain
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
const FIND_BROWSERS_QUERY = gql`
  query findBrowsers($siteId: String!, $from: String, $to: String) {
    findBrowsers(siteId: $siteId, from: $from, to: $to) {
      label
      total
    }
  }
`;
const FIND_OS_QUERY = gql`
  query findOs($siteId: String!, $from: String, $to: String) {
    findOs(siteId: $siteId, from: $from, to: $to) {
      label
      total
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
  FIND_SITE_QUERY,
  FIND_DASHBOARD_QUERY,
  FIND_CHARTS_QUERY,
  FIND_BROWSERS_QUERY,
  FIND_OS_QUERY,
  FIND_THEME
};
