// react, next
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import { Layout } from '@/components';

// project
import { ChatUserList, ChatRoom } from '@/components/Chat';

// third-party
import { Stomp, CompatClient } from '@stomp/stompjs';
import { v4 } from 'uuid';

// types
import { IChatMessage } from '@/types';

export default function Chatroom() {
  const session = useSession();
  const router = useRouter();

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');

  const [chatList, setChatList] = useState<IChatMessage[]>([]);

  const clientRef = useRef<CompatClient>();

  // 채팅방 연결
  const handleConnect = (id: string, chatMessages: IChatMessage[]) => {
    setRoomId(id);
    setChatList(chatMessages);
    const client = clientRef.current;
    if (client && !client.connected) {
      const headers = {
        Authorization: `Bearer ${session.data?.user.token}}`,
      };
      const connect_callback = () => {
        // STOMP 클라이언트의 연결 상태 확인
        if (!client.connected) {
          // TODO: 에러 핸들링 - STOMP 소켓 연결 안됨.
          console.log('STOMP 연결 상태: 연결 안 됨');
          return;
        }
        const subscribe_callback = (message: any) => {
          const chatData = JSON.parse(message.body);
          setChatList((chat) => [chatData, ...chat]);
        };
        client.subscribe(`/sub/chat/room/${id}`, subscribe_callback, headers);
        setOpenChat(true);
      };
      client.connect(headers, connect_callback);
    }
  };

  const handleDisconnect = useCallback(() => {
    const client = clientRef.current;
    if (client) {
      client.deactivate();
      setOpenChat(false);
    }
  }, []);

  const handleSendMessage = useCallback(
    (chatMessage: string) => {
      const client = clientRef.current;

      const { id, token } = session.data!.user;

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
    },
    [chatList, session]
  );

  useEffect(() => {
    if (!session.data?.user.id) {
      // TODO: redirect message
      router.push('/');
    }
    const client = Stomp.client('ws://168.188.123.234:8080/ws-connection');

    clientRef.current = client;

    client.disconnect = (frame) => {
      console.log('연결해제 실행', frame);
    };

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
      // TODO: 채팅방 내역 불러오는 재시도를 한다.
      console.log('Broker reported error: ', frame.headers['message']);
      console.log('Additional details: ', frame.body);
    };

    // Clean up when component unmounts
    return () => {
      client.disconnect();
      client.deactivate();
    };
  }, []);

  return (
    <Layout>
      <div className="relative mx-auto flex max-w-5xl h-screen">
        <ChatUserList
          userId={session.data ? session.data.user.id : ''}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        {openChat && (
          <ChatRoom
            chatList={chatList}
            currentUid={session.data!.user.id}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </Layout>
  );
}
