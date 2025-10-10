"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import UserReducer from "../features/Slice/UserSlice";

const rootReducer = combineReducers({
  User: UserReducer,
});


const persistConfig = {
  key: "root", 
  storage, 
  
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: process.env.NODE_ENV !== "production",
});


export const persistor = persistStore(store);

export default store;
