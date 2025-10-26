import {gql} from '@apollo/client';

export const AlertQueries = {
	GET_ALERT_LIST: gql`
		query GetNotificationList($start: Int!) {
		  getNotificationList(start: $start) {
		    notificationId
				content
				checked
				redirectType
				redirectId
				createAt
		  }
		}
	`,
	GET_ALERT_COUNT: gql`
		query GetNotificationCount {
		  getNotificationCount
		}
	`
}

export const AlertMutations = {
	READ_ALERT: gql`
		mutation checkNotification($notificationId: String!) {
		  checkNotification(notificationId: $notificationId)
		}
	`
}