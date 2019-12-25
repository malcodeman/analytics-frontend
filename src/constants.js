const GRAPHQL_URI = process.env.GRAPHQL_URI;
const IS_PROD_ENV = process.env.NODE_ENV === "production";

export default {
  GRAPHQL_URI,
  IS_PROD_ENV
};
