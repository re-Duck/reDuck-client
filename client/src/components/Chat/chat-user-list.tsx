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
  userId: string;
  handleConnect: (roomId: string, chatMessages: IChatMessage[]) => void;
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
  const [chatUserList, setChatUserList] = useState([]);
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
    setChatUserList(listData);
    console.log(listData);
  };

  const handleEnterRoom = (roomId: string, chatMessages: IChatMessage[]) => {
    handleConnect(roomId, chatMessages);
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
      <section className="flex flex-col m-2.5">
        <span>채팅방 목록</span>
        {chatUserList.map((dto) => {
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
              accessToken={accessToken}
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
