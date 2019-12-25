import { createStore } from "redux";

import rootReducer from "./rootReducer";

import localStorage from "./localStorage";

const persistedState = localStorage.loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.saveState({
    auth: store.getState().auth
  });
});

export default store;
