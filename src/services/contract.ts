import { ApolloClient, gql } from '@apollo/client';

export interface CreateContractInput {
  roomId: string;
  boarderId: string;
  expiryDate: string;
  contractPeriod: number;
}

export const ContractGQL = {
  MUTATIONS: {
    CREATE_CONTRACT: gql`
			mutation CreateContract($input: ContractCreateInput!) {
				createContract(contractCreateInput: $input)
			}
		`,
  },
} as const;

export const ContractService = {
  createContract: async (
    client: ApolloClient<any>,
    input: CreateContractInput
  ): Promise<boolean> => {
    const { data } = await client.mutate<{ createContract: boolean }>({
      mutation: ContractGQL.MUTATIONS.CREATE_CONTRACT,
      variables: { input },
    });
    return !!data?.createContract;
  },
};

