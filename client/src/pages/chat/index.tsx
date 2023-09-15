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

export default function Chatroom() {
  const session = useSession();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const [openChat, setOpenChat] = useState(false);
  const [roomId, setRoomId] = useState('');

  const [chatList, setChatList] = useState<IChatMessage[]>([]);

  const clientRef = useRef<CompatClient>();

  // 채팅방 연결
  const handleConnect = (id: string, chatMessages: IChatMessage[]) => {
    const client = clientRef.current;
    const headers = {
      Authorization: `Bearer ${session.data?.user.token}}`,
    };
    const subscribe_callback = (message: IMessage) => {
      const chatData = JSON.parse(message.body);
      setChatList((chat) => [chatData, ...chat]);
    };
    if (client && !client.connected) {
      const connect_callback = () => {
        // STOMP 클라이언트의 연결 상태 확인
        if (!client.connected) {
          // TODO: 에러 핸들링 - STOMP 소켓 연결 안됨.
          console.log('STOMP 연결 상태: 연결 안 됨');
          return;
        }
        client.subscribe(`/sub/chat/room/${id}`, subscribe_callback, headers);
        setOpenChat(true);
      };
      client.connect(headers, connect_callback);
    } else if (client && client.connected) {
      client.subscribe(`/sub/chat/room/${id}`, subscribe_callback, headers);
    }
    setRoomId(id);
    setChatList(chatMessages);
  };

  const handleDisconnect = () => {
    const client = clientRef.current;
    if (client && client.connected) {
      const headers = {
        Authorization: `Bearer ${session.data?.user.token}}`,
      };
      client.unsubscribe(roomId, headers);
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
    [chatList, session]
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
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        {openChat && (
          <ChatRoom
            chatList={chatList}
            currentUid={session.data?.user.id || ''}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </Layout>
  );
}
