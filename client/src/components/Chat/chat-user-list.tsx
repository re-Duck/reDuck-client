// react, next
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// services
import { getRecommandUser, getUserChatRoom } from '@/service/chat-get';

// components
import UserTile from './user-tile';

// types
import { IUserInfo, IChatMessage } from '@/types';

interface IChatUserList {
  handleConnect: (roomId: string, chatMessages: IChatMessage[]) => void;
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
  const [chatUserList, setChatUserList] = useState([]);
  const session = useSession();
  const { id, token } = session.data?.user || {};

  const loadUserChatList = async () => {
    const recommandData = await getRecommandUser();
    const listData = await getUserChatRoom({
      userId: id,
      token,
    });
    setRecommandUser(recommandData);
    setChatUserList(listData || []);
  };

  const handleEnterRoom = (roomId: string, chatMessages: IChatMessage[]) => {
    handleDisconnect();
    handleConnect(roomId, chatMessages);
    loadUserChatList();
  };

  useEffect(() => {
    loadUserChatList();
  }, []);

  return (
    <section className="relative border border-black min-w-[30%] h-5/6 text-center">
      <section className="flex flex-col m-2.5">
        <span>채팅방 목록</span>
        {chatUserList?.map((dto) => {
          const {
            lastChatMessage,
            lastChatMessageTime,
            otherUserDto,
            roomId,
            unReadMessageCount,
          } = dto;
          // TODO: 그룹채팅때문에 배열로 내려옴 그룹채팅 추가시 수정
          const { name, uesrId: otherId, userProfileImgPath } = otherUserDto[0];
          return (
            <UserTile
              key={roomId}
              roomId={roomId}
              token={token}
              userId={otherId}
              src={userProfileImgPath}
              name={name}
              description={lastChatMessage}
              handleEnterRoom={handleEnterRoom}
              type="room"
              lastChatMessageTime={lastChatMessageTime}
              unReadMessageCount={unReadMessageCount}
            />
          );
        })}
      </section>
      <section className="absolute bottom-0 left-0 right-0 flex flex-col m-2.5">
        <p>채팅 추천 유저 목록</p>
        {recommandUser.map((user) => {
          const { userId, userProfileImgPath, name, developAnnual } = user;
          return (
            <UserTile
              key={userId}
              token={token}
              userId={userId}
              src={userProfileImgPath}
              name={name}
              description={`${developAnnual}년차 개발자`}
              handleEnterRoom={handleEnterRoom}
              type="recommand"
            />
          );
        })}
      </section>
    </section>
  );
}