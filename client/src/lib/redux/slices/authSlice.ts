import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';

interface IUserState {
  userId: string;
  userName: string;
  userProfileImgPath: string;
  isLogin: boolean;
}

const initialState: IUserState = {
  userId: '',
  userName: '',
  userProfileImgPath: '',
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, actions: PayloadAction<IUserState>) => {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
      state.userProfileImgPath = actions.payload.userProfileImgPath;
      state.isLogin = true;
    },
    logOut: (state) => {
      state.userId = '';
      state.userName = '';
      state.isLogin = false;
    },
  },
  /* 페이지 이동시 상태 초기화가 필요한 경우 사용 */
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
