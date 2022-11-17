import { IUser, IUserValues } from "./../pages/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: IUserValues | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUserValues>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { logout, setUser } = userSlice.actions;
