import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUserState } from '@/types/redux/IUserState';

const initialState: IUserState = {
  userId: '',
  userName: '',
  userProfileImgPath: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, actions: PayloadAction<IUserState>) => {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.userProfileImgPath = actions.payload.userProfileImgPath;
    },
    logOut: () => initialState,
  },
});

export const { logIn, logOut } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
