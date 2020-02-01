const GRAPHQL_URI = process.env.GRAPHQL_URI;
const ANALYTICS_SCRIPT_SOURCE = process.env.ANALYTICS_SCRIPT_SOURCE;
const IS_PROD_ENV = process.env.NODE_ENV === "production";
const THEMES = {
  DARK: "DARK",
  LIGHT: "LIGHT"
};

export default {
  GRAPHQL_URI,
  ANALYTICS_SCRIPT_SOURCE,
  IS_PROD_ENV,
  THEMES
};
