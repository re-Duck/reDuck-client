'use client';

import Link from 'next/link';

// components
import { Avatar, Divider, Button } from '@/components';

interface IProps {
  userId: string;
  userName: string;
  imageUrl: string;
}

export default function PostProfile({ userId, userName, imageUrl }: IProps) {
  return (
    <div className="flex items-center justify-between py-12">
      <Link href={`/profile/${userId}`} className="flex items-center gap-6">
        <Avatar src={imageUrl} alt="user_icon" size="md" />
        <div className="flex flex-col items-start flex-1 gap-2 ">
          <h3 className="text-2xl font-bold">{userName}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-scale-600">100 팔로워</span>
            <Divider type="vertical" margin={3} thin={1} />
            <span className="text-sm text-gray-scale-600">124 채택</span>
          </div>
        </div>
      </Link>
      <Button color="yellow_line">+ 팔로우</Button>
    </div>
  );
}
