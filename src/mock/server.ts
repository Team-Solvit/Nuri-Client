import {ApolloServer} from 'apollo-server';
import {typeDefs} from './schema.js';

const server = new ApolloServer({
	typeDefs,
	mocks: {
		BoardingRoom: () => ({
			roomId: () => Math.random().toString(36).substr(2, 9),
			name: () => `하숙집 ${Math.floor(Math.random() * 100) + 1}호`,
			description: () => '깔끔하고 조용한 하숙집입니다.',
			monthlyRent: () => Math.floor(Math.random() * 500000) + 300000,
			headCount: () => Math.floor(Math.random() * 4) + 1,
			likeCount: () => Math.floor(Math.random() * 50),
			isLiked: () => Math.random() > 0.5,
			commentCount: () => Math.floor(Math.random() * 20),
			status: () => 'AVAILABLE',
			day: () => new Date().toISOString().split('T')[0],
		}),
		Query: () => ({
			searchBoardingRoom: () => Array.from({ length: 10 }, () => ({}))
		})
	},
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

server.listen({port: 4000}).then(({url}) => {
	console.log(`🚀 Mock GraphQL server ready at ${url}`);
});