import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface IUserState {
  userId: string;
  userName: string;
}

const initialState: IUserState = {
  userId: '',
  userName: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, actions: PayloadAction<IUserState>) => {
      state.userId = actions.payload.userId;
      state.userName = actions.payload.userName;
    },
    logOut: (state) => {
      state.userId = '';
    },
  },
  /* 페이지 이동시 상태 초기화가 필요한 경우 사용 */
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        // ...action.payload.auth
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

//export const selectUser = (state: RootState) => state.userInfo.value

export default authSlice.reducer;
