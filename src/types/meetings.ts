export interface Area {
	area: string;
	longitude: number;
	latitude: number;
}

export interface AreaResponse {
	getAreas: Area[];
}
export interface Marker {
	id: number;
	position: {
		lat: number;
		lng: number;
	};
}
export interface M {
	id: number;
	title: string;
}
export interface Status{
		groupId: null | string,
		groupName: null | string,
		hasGroup: boolean,
}