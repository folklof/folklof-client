import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../types";

const initialState: { user: UserProfile | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      return { ...state, user: action.payload };
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUserProfile, logoutUser } = userSlice.actions;
export default userSlice.reducer;
