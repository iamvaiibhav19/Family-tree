import { configureStore } from "@reduxjs/toolkit";
import familyTreeReducer from "./slice/familyTreeSlice";

export const store = configureStore({
  reducer: {
    familyTree: familyTreeReducer,
  },
});
