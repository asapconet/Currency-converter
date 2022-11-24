import { string } from "./../node_modules/@redux-saga/is/index.d";
import { IUser, IUserValues } from "./../pages/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user?: IUserValues | null;
  access_token?: any;
}

const initialState: IUserState = {
  user: null,
  access_token: "",
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setCredential: (state, action: PayloadAction<IUserValues>) => {
      state.user = action.payload;
      state.access_token = action.payload;
    },

    // state.access_token = action.payload;
  },
});

export default userSlice.reducer;
export const { logout, setCredential } = userSlice.actions;
