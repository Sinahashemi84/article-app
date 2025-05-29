import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../store/slices/themeSlice";
import articleReducer from "../store/slices/articleSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    Article: articleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
