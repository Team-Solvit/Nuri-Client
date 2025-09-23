import {gql} from "@apollo/client";

export const ContractQueries = {
	GET_ROOM_CONTRACT_LIST: gql`
		query getRoomContractList($roomId: String!){
			getRoomContractList(roomId: $roomId){
				room {
					roomId
				}
        contractInfo {
          boarder {
            callNumber
				    gender
          }
			    expiryDate
			    status
        }
			}
		}
	`,
}

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