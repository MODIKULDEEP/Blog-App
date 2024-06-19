import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./reducers/userReducer/userReducer";

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

setupListeners(store.dispatch);
export default store;
