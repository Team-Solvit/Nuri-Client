import { ApolloClient, gql } from '@apollo/client';

export interface CreateContractInput {
  roomId: string;
  hostId: string;
  expiryDate: string;
  contractPeriod: number;
}

export const ContractGQL = {
  MUTATIONS: {
    CREATE_CONTRACT: gql`
      mutation CreateContract($contractCreateRequestDto: ContractCreateInput!) {
        createContract(contractCreateRequestDto: $contractCreateRequestDto)
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
      variables: { contractCreateRequestDto: input },
    });
    return !!data?.createContract;
  },
};

