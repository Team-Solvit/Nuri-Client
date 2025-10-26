export interface AlertType {
	notificationId : string;
	content : string;
	checked : boolean;
	redirectType : RedirectType;
	redirectId : string;
	createAt :string;
}

export enum RedirectType {
	POST_DETAIL = "POST_DETAIL",
	MESSAGE = "MESSAGE",
	GROUP = "GROUP",
	USER = "USER",
	GROUP_MANAGE = "GROUP_MANAGE",
	BOARDING_MANAGE = "BOARDING_MANAGE"
}
