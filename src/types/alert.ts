export interface AlertType {
	notificationId : string,
	content : string,
	checked : boolean,
	redirectType : RedirectType
	redirectId : string,
	createAt :string
}

export enum RedirectType {
	POST_DETAIL,
	MESSAGE,
	GROUP,
	USER,
	GROUP_MANAGE,
	BOARDING_MANAGE
}