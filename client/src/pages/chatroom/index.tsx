import Layout from '@/components/Layout';
import React, { useEffect } from 'react';

import { Client, Stomp } from '@stomp/stompjs';

export default function Chatroom() {
  // STOMP 클라이언트 생성
  // ws://168.188.123.234:8080/ws-connection
  const client = Stomp.client('ws://168.188.123.234:8080/ws-connection');

  useEffect(() => {
    // 연결이벤트 핸들러
    client.onConnect = (frame) => {
      console.log('연결됐어!', frame);
    };

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
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
        <section className="relative border border-black min-w-[30%] h-5/6 text-center">
          <span>채팅방 목록</span>
          <ul>
            <li>dummy</li>
            <li>dummy</li>
            <li>dummy</li>
            <li>dummy</li>
          </ul>
          <div className="absolute bottom-0 left-0 right-0 flex m-2.5">
            <button
              onClick={handleConnect}
              className="flex-1 rounded-md bg-indigo-600 p-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
            >
              연결
            </button>
            <button
              onClick={handleDisconnect}
              className="flex-1 rounded-md bg-indigo-600 p-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
            >
              연결해제
            </button>
          </div>
        </section>
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
