import Layout from '@/components/Layout';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Stomp, Client } from '@stomp/stompjs';

// project
import { ChatUserList } from '@/components/Chat';
import ChatMessage from '@/components/Chat/chat-message';

export default function Chatroom() {
  // STOMP 클라이언트 생성
  // const client = Stomp.client('ws://168.188.123.234:8080/ws-connection');
  const session = useSession();
  const router = useRouter();

  const [openChat, setOpenChat] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const messageRef = useRef<HTMLInputElement>(null);

  const [chatList, setChatList] = useState<string[]>([]);

  const clientRef = useRef<Client | null>(null);

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

    // 연결이벤트 핸들러
    client.onConnect = (frame) => {
      // STOMP 클라이언트의 연결 상태 확인
      if (client.connected) {
        console.log('STOMP 연결 상태: 연결됨');
      } else {
        console.log('STOMP 연결 상태: 연결 안 됨');
      }
      // TODO: 채팅방 내역을 불러온다.
      console.log('연결됐어!', frame);
      client.subscribe('/sub/chat/room/1', () => {
        console.log('aa');
      });
      setOpenChat(true);
    };

    client.disconnect = (frame) => {
      console.log('연결해제', frame);
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

  const handleConnect = useCallback(() => {
    const client = clientRef.current;
    if (client && !client.connected) {
      // 연결 시도
      client.activate();
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    const client = clientRef.current;
    if (client) {
      client.deactivate();
      setOpenChat(false);
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    const client = clientRef.current;
    if (client && client.connected) {
      const headers = {
        Authorization: `Bearer ${session.data?.user.token}`,
      };
      const objectbody = {
        roomId: '1',
        message: chatMessage,
        userId: session.data?.user.id,
        type: 'CHAT',
      };

      const body = JSON.stringify(objectbody);

      client.publish({
        destination: 'pub/chat/message',
        body,
        headers,
      });

      setChatList([...chatList, chatMessage]);

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
            {chatList.map((val, idx) => (
              <span key={idx}>{val}</span>
            ))}
            <div className="flex m-2.5 absolute bottom-0 left-0 right-0">
              <input
                type="text"
                className="relative border border-black flex-1"
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
