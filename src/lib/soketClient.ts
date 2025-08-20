import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/socket";

export const soketClient = new Client({
	
	webSocketFactory: () => new SockJS(socketUrl),
	connectHeaders: {
		Authorization: localStorage.getItem('accessToken') || ""
	},
	reconnectDelay: 0,
	onConnect: (frame) => {
		console.log('연결 성공!', frame);
		soketClient.subscribe(`/user/${localStorage.getItem('userId')}/messages`, (message) => {
			const chat = JSON.parse(message.body);
			console.log('💬 새 메시지:', chat);
		});
		
		soketClient.subscribe(`/user/${localStorage.getItem('userId')}/exceptions`, (message) => {
			console.log('📩 메시지 도착:', message.body);
			alert(message.body); // 중복 로그인 알림 등
			soketClient.deactivate();
		});
	},
	onStompError: (frame) => {
		console.error('STOMP 오류:', frame);
	}
});

export const sendMessageDm = (content: string, receiver: string) => {
	soketClient.publish({
		destination: `/chat/dm/${receiver}`,
		body: JSON.stringify({
			contents: content,
			replyChat: null
		}),
	});
};