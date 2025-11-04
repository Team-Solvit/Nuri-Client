import type {ChatMessageResponse} from "./type";

export const fakeData: ChatMessageResponse[] = [
	// 2025-02-25
	{
		id: "1",
		contents: "안녕하세요~~",
		createdAt: "2025-02-25T15:31:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "3",
		contents: "공부가 너무 힘드네요...",
		createdAt: "2025-02-25T15:31:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "4",
		contents: "다음 모임 즐기실래요?",
		createdAt: "2025-02-25T17:31:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	{
		id: "5",
		contents: "그럼 모임에서 같이 놀고 공부하실래요?",
		createdAt: "2025-02-25T17:31:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	{
		id: "2",
		contents: "오 재밌을것같아요",
		createdAt: "2025-02-25T15:31:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "6",
		contents: "그럼 일단 저희 모임들어오세요 저희 모임 이름은요..",
		createdAt: "2025-02-25T17:31:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	
	// 2025-02-26
	{
		id: "9",
		contents: "어제 산책 잘 했어?",
		createdAt: "2025-02-26T09:12:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "10",
		contents: "응! 날씨가 좋아서 기분 좋았어.",
		createdAt: "2025-02-26T09:13:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	{
		id: "11",
		contents: "부럽다... 나도 나가고 싶었는데 일이 많았어.",
		createdAt: "2025-02-26T09:14:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "12",
		contents: "오늘은 시간 괜찮아?",
		createdAt: "2025-02-26T09:15:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	{
		id: "13",
		contents: "오늘은 오후에 미팅이 있어서 힘들 듯 ㅠㅠ",
		createdAt: "2025-02-26T09:16:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "14",
		contents: "아쉽다! 다음에 같이 나가자~",
		createdAt: "2025-02-26T09:17:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	
	// 2025-02-27
	{
		id: "15",
		contents: "오늘 점심 뭐 먹을래?",
		createdAt: "2025-02-27T11:30:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "16",
		contents: "오늘은 파스타 어때?",
		createdAt: "2025-02-27T11:31:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
	{
		id: "17",
		contents: "좋아! 근처에 새로 생긴 곳 있던데 거기 가볼래?",
		createdAt: "2025-02-27T11:33:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "19",
		contents: "ㅇㅋㅇㅋ~",
		createdAt: "2025-02-27T11:33:00",
		sender: {
			profile: "@/assets/meeting/profile.png",
			name: "프로필",
		},
		roomId: "room-1",
	},
	{
		id: "18",
		contents: "오 굿! 12시에 로비에서 보자.",
		createdAt: "2025-02-27T11:34:00",
		sender: {
			profile: null,
			name: "나",
		},
		roomId: "room-1",
	},
];
// 	{
// 		id: 20,
// 		type: 'sent',
// 		text: "",
// 		img: '/post/post-example.png',
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	},
// 	{
// 		id: 21,
// 		type: 'sent',
// 		text: "",
// 		roomTour: {
// 			master: true,
// 			name: "그랜마 하우스 302호",
// 			date: "5월 15일 (목)",
// 			time: "오후 1:00",
// 			thumbnail: "/post/post-example.png",
// 			tourId: 1
// 		},
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	},
// 	{
// 		id: 22,
// 		type: 'received',
// 		text: "",
// 		contract: {
// 			master: true,
// 			name: "그랜마 하우스 302호",
// 			thumbnail: "/post/post-example.png",
// 			contractId: 1
// 		},
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	},
// 	{
// 		id: 23,
// 		type: 'sent',
// 		text: "",
// 		contract: {
// 			master: false,
// 			name: "그랜마 하우스 302호",
// 			thumbnail: "/post/post-example.png",
// 			contractId: 1
// 		},
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	},
// 	{
// 		id: 24,
// 		type: 'received',
// 		text: "",
// 		img: '/post/post-example.png',
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	},
// 	{
// 		id: 25,
// 		type: 'received',
// 		text: "",
// 		roomTour: {
// 			master: false,
// 			name: "그랜마 하우스 302호",
// 			date: "5월 15일 (목)",
// 			time: "오후 1:00",
// 			thumbnail: "/post/post-example.png",
// 			tourId: 1
// 		},
// 		time: '오전 11:34',
// 		profile: '@/assets/meeting/profile.png',
// 		name: '프로필',
// 	}
// ];