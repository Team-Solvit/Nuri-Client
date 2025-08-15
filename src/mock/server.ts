import {ApolloServer} from 'apollo-server';
import {typeDefs} from './schema.js';

const server = new ApolloServer({
	typeDefs,
	mocks: true,
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

server.listen({port: 4000}).then(({url}) => {
	console.log(`🚀 Mock GraphQL server ready at ${url}`);
});