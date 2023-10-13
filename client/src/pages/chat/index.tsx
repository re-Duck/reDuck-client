// react, next
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
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

// constant
import { ModalType, errorMessage } from '@/constant';
import { createChatRoom } from '@/service/chat-post';

export default function Chatroom() {
  const session = useSession();
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
    const headers = {
      Authorization: `Bearer ${session.data?.user.token}}`,
    };
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
          subscribe_callback,
          headers
        );
        setSubId(subscription.id);
        setOpenChat(true);
      };
      client.connect(headers, connect_callback);
    } else if (client && client.connected) {
      const subscription = client.subscribe(
        `/sub/chat/room/${id}`,
        subscribe_callback,
        headers
      );
      setSubId(subscription.id);
    }
    setRoomId(id);
  };

  const handleDisconnect = () => {
    const client = clientRef.current;
    if (client && client.connected) {
      const headers = {
        Authorization: `Bearer ${session.data?.user.token}}`,
      };
      client.unsubscribe(subId, headers);
    }
  };

  const handleSendMessage = useCallback(
    (chatMessage: string) => {
      const client = clientRef.current;

      if (session.data) {
        const { id, token } = session.data.user;

        if (client && client.connected) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const objectbody = {
            roomId,
            message: chatMessage,
            messageId: v4(),
            userId: id,
            type: 'CHAT',
          };

          const body = JSON.stringify(objectbody);

          client.publish({
            destination: '/pub/chat/message',
            body,
            headers,
          });
        }
      }
    },
    [session, roomId]
  );

  useEffect(() => {
    if (!session.data) {
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
    const client = Stomp.client('ws://168.188.123.234:8080/ws-connection');

    clientRef.current = client;

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
      // TODO: 채팅방 내역 불러오는 재시도를 한다.
      console.log('Broker reported error: ', frame.headers['message']);
      console.log('Additional details: ', frame.body);
    };

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div className="relative mx-auto flex max-w-5xl h-screen">
        <ChatUserList
          enteredRoomId={roomId}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        {openChat && (
          <ChatRoom
            token={session.data?.user.token || ''}
            roomId={roomId}
            chatList={chatList}
            setChatList={setChatList}
            currentUid={session.data?.user.id || ''}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </Layout>
  );
}
