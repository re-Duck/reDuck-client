// react, next
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '@/lib/redux/slices/authSlice';

// hooks
import { useModal } from '@/hooks';

// services
import axios, { AxiosError } from 'axios';
import { userManager } from '@/service/user';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

export default function AuthComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { openModal } = useModal();

  function decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  const getUserData = async () => {
    // reload시 유저 전역데이터 세팅
    try {
      const accessToken = await silentRefresh();
      const { sub: userId } = decodeJWT(accessToken);
      const { name: userName, userProfileImgPath } = (await userManager.getUser(
        userId
      )) as { name: string; userProfileImgPath: string };
      const payload = { userId, userName, userProfileImgPath };
      dispatch(logIn(payload));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== '로그인하지 않은 유저') {
          openModal({
            type: ModalType.ERROR,
            message: errorMessage.sessionExpiration,
          });
        }
      } else if (error instanceof AxiosError) {
        // 유저정보 불러오기 실패, 새로고침할 수 있게.
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.failedGetUser,
        });
      } else {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.Unknown,
        });
      }
    }
  };

  const silentRefresh = async () => {
    const response = await fetch('/api/getToken', { method: 'GET' });
    const { message, data } = await response.json();
    if (!response.ok) {
      dispatch(logOut());
      throw new Error(message);
    }
    const { accessToken } = data;

    // axios default header 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    return accessToken;
  };

  useEffect(() => {
    getUserData();
  }, []);

  // TODO: refreshToken 기반 accessToken 발급 갱신

  return <>{children}</>;
}
