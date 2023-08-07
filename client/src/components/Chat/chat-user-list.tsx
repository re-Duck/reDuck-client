// react, next
import React, { useEffect, useState } from 'react';

// services
import { getRecommandUser } from '@/service/chat-get-user';

// components
import { Avatar, Icon } from '@/components';

// types
import { IUserInfo } from '@/types';

interface IChatUserList {
  handleConnect: () => void;
  handleDisconnect: () => void;
}
export default function ChatUserList({
  handleConnect,
  handleDisconnect,
}: IChatUserList) {
  const [recommandUser, setRecommandUser] = useState<
    Pick<
      IUserInfo,
      'userId' | 'name' | 'company' | 'developAnnual' | 'userProfileImgPath'
    >[]
  >([]);
  const loadRecommandUser = async () => {
    const data = await getRecommandUser();
    console.log(data);
  };

  useEffect(() => {
    loadRecommandUser();
  }, []);
  // uid를 넘겨받아서 유저가 가지고 있는 채팅방 목록을 불러온다.
  // 채팅방 목록중에 하나를 탭하면 소켓연결을 시작하며 채팅방 내역을 불러온다.
  return (
    <section className="relative border border-black min-w-[30%] h-5/6 text-center">
      <span>채팅방 목록</span>
      <ul>
        <li>dummy</li>
        <li>dummy</li>
        <li>dummy</li>
        <li>dummy</li>
      </ul>
      <section className="absolute bottom-0 left-0 right-0 flex flex-col m-2.5">
        <p>채팅 추천 유저 목록</p>
        <div className="flex gap-2 font-semibold items-center mb-4">
          <Avatar src={''} alt="user_icon" size="sm" />
          <div className="flex flex-col">
            <span className="text-md">유저이름</span>
            <span className="text-xs text-gray-400">{`5년차 개발자 `}</span>
          </div>
          <button className="absolute right-0 disabled:opacity-70 w-8 h-8 sm:w-10 sm:h-10">
            <Icon
              name="message-circle"
              size={30}
              strokeWidth={3}
              color="black"
            />
          </button>
        </div>
      </section>
    </section>
  );
}
