const GRAPHQL_URI = process.env.GRAPHQL_URI;
const ANALYTICS_SCRIPT_SOURCE = process.env.ANALYTICS_SCRIPT_SOURCE;
const IS_PROD_ENV = process.env.NODE_ENV === "production";
const THEMES = {
  DARK: "DARK",
  LIGHT: "LIGHT"
};
const NAME = "Analytics";
const BREAKPOINTS = {
  SMALL_DEVICES: "576px",
  MEDIUM_DEVICES: "768px",
  LARGE_DEVICES: "992px",
  EXTRA_LARGE_DEVICES: "1200px"
};

export default {
  GRAPHQL_URI,
  ANALYTICS_SCRIPT_SOURCE,
  IS_PROD_ENV,
  THEMES,
  NAME,
  BREAKPOINTS
};
