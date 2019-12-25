import { combineReducers } from "redux";

import auth from "../features/auth/authReducers";

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
