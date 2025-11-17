"use client";

import React from "react";
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "@/lib/apolloClient";
import {GoogleMapsProvider} from "./GoogleMapsProvider";

export function Providers({children}: { children: React.ReactNode }) {
	const client = useApollo();
	
	return (
		<ApolloProvider client={client}>
			<GoogleMapsProvider>
				{children}
			</GoogleMapsProvider>
		</ApolloProvider>
	);
}


// CSR식 데이터 요청

// service/user.ts
// import { gql, useQuery } from '@apollo/client';
//
// const GET_USERS = gql`
//   query GetUsers {
//     users {
//       id
//       name
//     }
//   }
// `;
//
// page/user/page.tsx
// export default function UsersPage() {
// 	const { data, loading, error } = useQuery(GET_USERS);
//}


// SSR식 데이터 요청
// import { gql, useQuery } from '@apollo/client';
// import { GetServerSideProps } from 'next';
// import { initializeApollo } from '@/lib/apolloClient';
//
// service/user.ts
// const GET_PROFILE = gql`
//   query GetProfile {
//     me {
//       id
//       name
//       email
//     }
//   }
// `;
//
// page/user/page.tsx
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const apolloClient = initializeApollo();
//
// 	await apolloClient.query({
// 		query: GET_PROFILE,
// 	});
//
// 	return {
// 		: {
// 			initialApolloState: apolloClient.cache.extract(),
// 		},
// 	};
// };
//
// export default function ProfilePage() {
// 	const { data, loading, error } = useQuery(GET_PROFILE);