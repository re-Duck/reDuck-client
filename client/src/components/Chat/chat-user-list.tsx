// react, next
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// services
import { getRecommandUser, getUserChatRoom } from '@/service/chat-get-user';

// components
import UserTile from './user-tile';

// types
import { IUserInfo } from '@/types';

interface IChatUserList {
  userId: string;
  handleConnect: (roomId: string) => void;
  handleDisconnect: () => void;
}
export default function ChatUserList({
  userId,
  handleConnect,
  handleDisconnect,
}: IChatUserList) {
  const [recommandUser, setRecommandUser] = useState<
    Pick<
      IUserInfo,
      'userId' | 'name' | 'company' | 'developAnnual' | 'userProfileImgPath'
    >[]
  >([]);
  const [chatlist, setChatList] = useState([]);
  const session = useSession();
  const user = session.data?.user;
  const accessToken = user ? user.token : '';

  const loadUserChatList = async () => {
    const recommandData = await getRecommandUser();
    const listData = await getUserChatRoom({
      userId,
      accessToken,
    });
    setRecommandUser(recommandData);
    setChatList(listData);
    console.log(listData);
  };

  const handleEnterRoom = (roomId: string) => {
    handleConnect(roomId);
    // if (data !== '') {
    //   // 새로운 채팅방 개설시
    //   setChatList([...chatlist]);
    // } else {
    //   // 기존 채팅방 입장시
    // }
  };

  useEffect(() => {
    loadUserChatList();
  }, []);
  // uid를 넘겨받아서 유저가 가지고 있는 채팅방 목록을 불러온다.
  // 채팅방 목록중에 하나를 탭하면 소켓연결을 시작하며 채팅방 내역을 불러온다.
  return (
    <section className="relative border border-black min-w-[30%] h-5/6 text-center">
      <span>채팅방 목록</span>
      <ul>
        {/* TODO: 채팅방 목록 불러오기
        채팅방 개설시에 개설된 채팅방 임의로 추가하기
        */}
        <li>dummy</li>
        <li>dummy</li>
        <li>dummy</li>
        <li>dummy</li>
      </ul>
      <section className="absolute bottom-0 left-0 right-0 flex flex-col m-2.5">
        <p>채팅 추천 유저 목록</p>
        {recommandUser.map((user) => (
          <UserTile
            key={user.userId}
            accessToken={accessToken}
            userId={user.userId}
            src={user.userProfileImgPath}
            name={user.name}
            description={`${user.developAnnual}년차 개발자`}
            handleEnterRoom={handleEnterRoom}
            type="recommand"
          />
        ))}
      </section>
    </section>
  );
}
