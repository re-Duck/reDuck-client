import React from 'react';
import { useQuery } from '@tanstack/react-query';

// components
import { Avatar } from '@/components';

// services
import { BASE_URL } from '@/service/base/api';
import { userManager } from '@/service/user';

// types
import { IUserInfo } from '@/types';

export default function SideProfile({
  targetUserId,
}: {
  targetUserId: string;
}) {
  const { data: userData } = useQuery({
    queryKey: ['sideProfile', targetUserId],
    queryFn: () => userManager.getUser(targetUserId),
    suspense: true,
  });

  const { company, name, school, userProfileImgPath } = userData as IUserInfo;

  return (
    <>
      <Avatar
        src={`${BASE_URL}${userProfileImgPath || ''}`}
        alt="profileImg"
        size="xl"
      />
      <div className="mt-4">
        <p>{name}</p>
        <p>{company}</p>
        <p>{school}</p>
      </div>
    </>
  );
}
