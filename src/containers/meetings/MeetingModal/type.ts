import {StaticImageData} from "next/image";

export interface MeetingModalProps {
	groupId: string;
	name: string;
	// location: string;
	description: string;
	banner: string | StaticImageData;
	profile: string;
}