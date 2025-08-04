import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = 'http://localhost:8080/websocket';
const dohunToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b29uZG9odW4iLCJyb2xlIjoiVVNFUiIsIm1hZGVCeSI6Im51cmkiLCJpYXQiOjE3NTQyODcxMTQsImV4cCI6MTc1NDI4ODAxNH0.bUXvCbB05f4zCsf7OMbUWDFA1KqsOl9qys0qeAosUmE";
const dongwookKimToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb25nd29va0tpbSIsInJvbGUiOiJVU0VSIiwibWFkZUJ5IjoibnVyaSIsImlhdCI6MTc1NDI4NzEzNiwiZXhwIjoxNzU0Mjg4MDM2fQ.C0AuK4QB2u0f6AYudDbf82riDokH6Zgc9zCjLO0Sltg";

export const dongwookKimclient = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  connectHeaders: {
    Authorization: dongwookKimToken
  },
  reconnectDelay: 0,
  onConnect: (frame) => {
    console.log('연결 성공!', frame);
    dongwookKimclient.subscribe('/user/dongwookKim/messages', (message) => {
      const chat = JSON.parse(message.body);
      console.log('💬 새 메시지:', chat);
    });

     dongwookKimclient.subscribe('/user/dongwookKim/exceptions', (message) => {
      console.log('📩 메시지 도착:', message.body);
      alert(message.body); // 중복 로그인 알림 등
      dongwookKimclient.deactivate();
    });
  },
  onStompError: (frame) => {
    console.error('STOMP 오류:', frame);
  }
});



export const dohunClient = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  connectHeaders: {
    Authorization: dohunToken
  },
  reconnectDelay: 0,
  onConnect: (frame) => {
    console.log('연결 성공!', frame);
    dohunClient.subscribe('/user/yoondohun/messages', (message) => {
      const chat = JSON.parse(message.body);
      console.log('💬 새 메시지:', chat);
    });

     dohunClient.subscribe('/user/yoondohun/exceptions', (message) => {
      console.log('📩 메시지 도착:', message.body);
      alert(message.body); // 중복 로그인 알림 등
      dohunClient.deactivate();
    });
  },
  onStompError: (frame) => {
    console.error('STOMP 오류:', frame);
  }
});

export const sendMessage = ( sender: string, content: string) => {
  dohunClient.publish({
    destination: `/chat/dm/dongwookKim`,
    body: JSON.stringify({
      contents: "내용",
      replyChat : null
    }),
  });
};
// 동욱 계정 로그인 -> dm 방을 sub
// 도훈 계정 로그인 -> dm 방을 sub
// 도훈 계정에서 /chat/dm/dongwookKim 메시지 전송