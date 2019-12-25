import { LOGIN_SUCCESS, LOGOUT } from "./constants";
import constants from "../../constants";

export default (state = {}, action) => {
  if (!constants.IS_PROD_ENV) {
    console.log(
      `%c${action.type}`,
      "background: #000; color: #22edfc; padding: 4px"
    );
  }
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true
      };
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false
      };
    default:
      return state;
  }
};
