import Layout from '@/components/Layout';
import React, { useEffect } from 'react';

import { Stomp } from '@stomp/stompjs';

// project
import { ChatUserList } from '@/components/Chat';

export default function Chatroom() {
  // STOMP 클라이언트 생성
  const client = Stomp.client('ws://168.188.123.234:8080/ws-connection');

  useEffect(() => {
    // 연결이벤트 핸들러
    client.onConnect = (frame) => {
      // TODO: 채팅방 내역을 불러온다.
      console.log('연결됐어!', frame);
    };

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
      // TODO: 채팅방 내역 불러오는 재시도를 한다.
      console.log('Broker reported error: ', frame.headers['message']);
      console.log('Additional details: ', frame.body);
    };
  }, []);

  const handleConnect = () => {
    // 연결 시도
    client.activate();
  };
  const handleDisconnect = () => {
    client.deactivate();
  };
  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl h-screen">
        <ChatUserList
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        <section className="relative flex-1 ml-4 border border-black h-5/6">
          채팅
          <div className="flex m-2.5 absolute bottom-0 left-0 right-0">
            <input
              type="text"
              className="relative border border-black flex-1"
            />
            <button
              type="button"
              className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
            >
              전송
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
