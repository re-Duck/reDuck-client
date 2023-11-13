// react, next
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// components
import { Layout } from '@/components';
import { ChatUserList, ChatRoom } from '@/components/Chat';

// hooks
import { useModal } from '@/hooks';

// third-party
import { Stomp, CompatClient, IMessage } from '@stomp/stompjs';
import { v4 } from 'uuid';

// types
import { IChatMessage } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

export default function Chatroom() {
  const user = useSelector((state: IReduxState) => state.auth);
  const { userId } = user;
  const router = useRouter();
  const { query } = router;
  const { openModal, closeModal } = useModal();

  const [openChat, setOpenChat] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [subId, setSubId] = useState('');

  const [chatList, setChatList] = useState<IChatMessage[]>([]);

  const clientRef = useRef<CompatClient>();

  // 채팅방 연결
  const handleConnect = (id: string) => {
    const client = clientRef.current;
    // TODO: header token필요

    const subscribe_callback = (message: IMessage) => {
      const chatData = JSON.parse(message.body);
      setChatList((chat) => [...chat, chatData]);
    };
    if (client && !client.connected) {
      const connect_callback = () => {
        // STOMP 클라이언트의 연결 상태 확인
        if (!client.connected) {
          console.error('STOMP 연결 상태: 연결 안 됨');
          return;
        }
        const subscription = client.subscribe(
          `/sub/chat/room/${id}`,
          subscribe_callback
          //headers
        );
        setSubId(subscription.id);
        setOpenChat(true);
      };
      // client.connect(headers, connect_callback);
      client.connect(connect_callback);
    } else if (client && client.connected) {
      const subscription = client.subscribe(
        `/sub/chat/room/${id}`,
        subscribe_callback
        //headers
      );
      setSubId(subscription.id);
    }
    setRoomId(id);
  };

  const handleDisconnect = () => {
    const client = clientRef.current;
    if (client && client.connected) {
      // TODO: header token필요
      // client.unsubscribe(subId, headers);
      client.unsubscribe(subId);
    }
  };

  const handleSendMessage = useCallback(
    (chatMessage: string) => {
      const client = clientRef.current;

      if (user) {
        if (client && client.connected) {
          const objectbody = {
            roomId,
            message: chatMessage,
            messageId: v4(),
            userId,
            type: 'CHAT',
          };

          const body = JSON.stringify(objectbody);

          client.publish({
            destination: '/pub/chat/message',
            body,
          });
          // TODO: header token필요
          // client.publish({
          //   destination: '/pub/chat/message',
          //   body,
          //   headers,
          // });
        }
      }
    },
    [user, roomId]
  );

  useEffect(() => {
    if (!user) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.needLogin,
        callback: () => {
          closeModal();
          router.replace('/login');
        },
      });
      return;
    }
    const client = Stomp.client(`${process.env.NEXT_PUBLIC_CHAT_URL}`);

    clientRef.current = client;

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.socket,
        callback: () => {
          router.reload();
        },
      });
    };

    if (query.roomId) {
      handleConnect(query.roomId as string);
    }

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div className="relative pt-8 mx-auto flex max-w-5xl h-[calc(100vh-6rem)]">
        <ChatUserList
          enteredRoomId={roomId}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        {openChat && (
          <ChatRoom
            roomId={roomId}
            chatList={chatList}
            setChatList={setChatList}
            currentUid={userId}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </Layout>
  );
}
