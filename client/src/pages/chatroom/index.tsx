import Layout from '@/components/Layout';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Stomp, CompatClient } from '@stomp/stompjs';

// project
import { ChatUserList } from '@/components/Chat';

// for chat-id
import { v4 } from 'uuid';

// types
import { IChatMessage } from '@/types';

export default function Chatroom() {
  const session = useSession();
  const router = useRouter();

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const messageRef = useRef<HTMLInputElement>(null);

  const [chatList, setChatList] = useState<IChatMessage[]>([]);

  const clientRef = useRef<CompatClient>();

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

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
    };
  }, []);

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
        console.log('onConnet 시작', roomId);
        // STOMP 클라이언트의 연결 상태 확인
        if (!client.connected) {
          console.log('STOMP 연결 상태: 연결 안 됨');
          return;
        }
        const subscribe_callback = () => {
          console.log('구독완료');
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

  const handleSendMessage = useCallback(() => {
    const client = clientRef.current;

    const { name, userProfileImgPath, id, token } = session.data!.user;

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

      const chat = {
        ...objectbody,
        messageTime: `${new Date()}`,
        userProfileImgPath,
        name,
      };

      // TODO: IChatMessageType으로 추가

      setChatList([chat, ...chatList]);

      setChatMessage('');
    }
  }, [chatList, chatMessage, session]);
  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl h-screen">
        <ChatUserList
          userId={session.data ? session.data.user.id : ''}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        {openChat && (
          <section className="relative flex-1 ml-4 border border-black h-5/6">
            {chatList.map((val) => {
              const {
                messageId,
                message,
                userId: senderId,
                name,
                userProfileImgPath,
              } = val;
              return <p key={messageId}>{message}</p>;
            })}
            <div className="flex m-2.5 absolute bottom-0 left-0 right-0">
              <input
                type="text"
                className="relative border border-black flex-1 p-1"
                value={chatMessage}
                ref={messageRef}
                onChange={handleMessageChange}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
              >
                전송
              </button>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
