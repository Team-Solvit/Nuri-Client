import {gql} from '@apollo/client';

export const AlertQueries = {
	GET_ALERT_LIST: gql`
		query GetAlertList {
			getAlertList {
				alertId
				alertContent
				alertDate
				alertNavigate
			}
		}
	`,
	GET_ALERT_COUNT: gql`
		query GetAlertCount {
			getAlertCount
		}
	`
}