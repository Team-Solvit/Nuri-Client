import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = 'http://localhost:8080/websocket';

export const client = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  connectHeaders: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb25nd29va0tpbSIsInJvbGUiOiJVU0VSIiwibWFkZUJ5IjoibnVyaSIsImlhdCI6MTc1NDEwMzc3MywiZXhwIjoxNzU0MTA0NjczfQ.US8jQVfXp_hhSYquqWM7FXiztVpfUnQl525mzKUtVuc'
  },
  reconnectDelay: 0,
  onConnect: (frame) => {
    console.log('연결 성공!', frame);
     client.subscribe('/user/login/status', (message) => {
      console.log('📩 메시지 도착:', message.body);
      alert(message.body); // 중복 로그인 알림 등
    });
  },
  onStompError: (frame) => {
    console.error('STOMP 오류:', frame);
  },
});