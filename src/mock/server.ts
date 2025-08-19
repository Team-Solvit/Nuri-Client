import {ApolloServer} from 'apollo-server';
import {typeDefs} from './schema.js';

const server = new ApolloServer({
	typeDefs,
	mocks: {
		SnsPostFile: () => ({
			url: "https://storage.googleapis.com/ploytechcourse-version3/068e3374-6f3d-4e1a-985c-81a482f016d6",
		}),
		BoardingRoomFile: () => ({
			url: "https://storage.googleapis.com/ploytechcourse-version3/068e3374-6f3d-4e1a-985c-81a482f016d6",
		}),
		Author: () => ({
			profile: "https://storage.googleapis.com/ploytechcourse-version3/068e3374-6f3d-4e1a-985c-81a482f016d6",
		}),
		BoardingUser: () => ({
			profile: "https://storage.googleapis.com/ploytechcourse-version3/068e3374-6f3d-4e1a-985c-81a482f016d6",
		}),
	},
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

server.listen({port: 4000}).then(({url}) => {
	console.log(`🚀 Mock GraphQL server ready at ${url}`);
});