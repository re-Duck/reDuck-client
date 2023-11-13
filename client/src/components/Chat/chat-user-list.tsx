// react, next
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// services
import { getRecommandUser, getUserChatRoom } from '@/service/chat-get';

// components
import UserTile from './user-tile';

// types
import { IUserInfo, IChatUserDto } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

interface IChatUserList {
  enteredRoomId: string;
  handleConnect: (roomId: string) => void;
  handleDisconnect: () => void;
}
export default function ChatUserList({
  enteredRoomId,
  handleConnect,
  handleDisconnect,
}: IChatUserList) {
  const [recommandUser, setRecommandUser] = useState<
    Pick<
      IUserInfo,
      'userId' | 'name' | 'company' | 'developAnnual' | 'userProfileImgPath'
    >[]
  >([]);
  const [chatUserList, setChatUserList] = useState<IChatUserDto[]>([]);

  const user = useSelector((state: IReduxState) => state.auth);
  const { userId } = user;

  const loadUserChatList = async () => {
    const recommandData = await getRecommandUser();
    const listData = await getUserChatRoom({
      userId,
    });
    setRecommandUser(recommandData);
    setChatUserList(listData || []);
  };

  const handleEnterRoom = (roomId: string) => {
    handleDisconnect();
    handleConnect(roomId);
    loadUserChatList();
  };

  useEffect(() => {
    loadUserChatList();
  }, []);

  return (
    <section className="relative border border-black w-[30%] text-center">
      <section className="flex flex-col my-2.5 overflow-y-scroll">
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
              enteredRoomId={enteredRoomId}
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
      <section className="absolute bottom-0 left-0 right-0 flex flex-col">
        <p>채팅 추천 유저 목록</p>
        {recommandUser.map((user) => {
          const { userId, userProfileImgPath, name, developAnnual } = user;
          return (
            <UserTile
              key={userId}
              enteredRoomId="none"
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
