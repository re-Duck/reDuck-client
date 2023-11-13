// react, next
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '@/lib/redux/slices/authSlice';

// services
import axios from 'axios';
import { userManager } from '@/service/user';

export default function AuthComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
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
    } catch {
      console.error('유저데이터 불러오기 실패');
    }
  };

  const silentRefresh = async () => {
    try {
      const result = await fetch('/api/getToken', { method: 'GET' });
      const { data } = await result.json();
      const { accessToken } = data;

      // axios default header 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return accessToken;
    } catch (error) {
      console.error(error);
      //TODO: 토큰 만료 메시지 출력
      //TODO: 전역 데이터 정리
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // TODO: refreshToken 기반 accessToken 발급 갱신

  return <>{children}</>;
}
