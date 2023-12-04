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
    logIn: (state, actions: PayloadAction<IUserState>) =>
      Object.assign(state, actions.payload),
    update: (state, actions: PayloadAction<Omit<IUserState, 'userId'>>) =>
      Object.assign(state, actions.payload),
    logOut: () => initialState,
  },
});

export const { logIn, update, logOut } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
