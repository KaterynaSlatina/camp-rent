import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { kampsReducer } from "./kampsSlice";
import { favoritesReducer } from "./favoritesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  kamps: kampsReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistConfig = {
//   key: "products",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   kamps: kampsReducer,
  //   favorites: persistedReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
