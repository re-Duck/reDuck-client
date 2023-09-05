import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { logIn } from '@/lib/redux/slices/authSlice';

export default function AuthComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      const payload = {
        userId: session.user.id,
        userName: session.user.name,
        userProfileImgPath: session.user.userProfileImgPath,
        isLogin: true,
      };
      dispatch(logIn(payload));
    }
  }, [session]);

  return <>{children}</>;
}
