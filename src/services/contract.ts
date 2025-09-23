import {gql} from "@apollo/client";


export const ContractMutations = {
	ACCEPT_CONTRACT: gql`
	mutation acceptContract($contractId: String!) {
			acceptContract(contractId: $contractId)
		}
	`,
	REJECT_CONTRACT: gql`
		mutation rejectContract($contractId: String!) {
			rejectContract(contractId: $contractId)
		}
	`,
}