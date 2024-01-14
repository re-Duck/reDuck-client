'use client';

// react, next
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '@/lib/redux/features/auth/authSlice';

// hooks
import { useModal } from '@/hooks';

// services
import axios, { AxiosError } from 'axios';
import { userManager } from '@/service/user';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

// utils
import { decodeJWT } from '@/util';

export default function AuthComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  const getUserData = async () => {
    // reload시 유저 전역데이터 세팅
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        const { sub: userId } = decodeJWT(accessToken);
        const { name: userName, userProfileImgPath } =
          await userManager.getUser(userId);
        const payload = { userId, userName, userProfileImgPath };
        dispatch(logIn(payload));
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // 유저정보 불러오기 실패, 새로고침할 수 있게.
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.failedGetUser,
        });
      } else if (error instanceof Error) {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.sessionExpiration,
          callback: () => {
            closeModal();
            router.replace('/login');
          },
        });
      } else {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.Unknown,
        });
      }
    }
  };

  const getAccessToken = async () => {
    const response = await fetch('/api/getToken', { method: 'GET' });
    const { message, data } = await response.json();
    if (!response.ok) {
      dispatch(logOut());
      throw new Error(message);
    }
    const { accessToken } = data;

    // axios default header 설정
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    return accessToken;
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    // 10분마다 토큰 재발급
    const silentRefresh = async () => {
      try {
        await getAccessToken();
      } catch (error) {
        if (error instanceof Error) {
          openModal({
            type: ModalType.ERROR,
            message: errorMessage.sessionExpiration,
            callback: () => {
              closeModal();
              router.replace('/login');
            },
          });
        }
      }
    };
    const refreshToken = setInterval(silentRefresh, 10 * 60 * 1000);

    return () => clearInterval(refreshToken);
  }, []);

  return <>{children}</>;
}
