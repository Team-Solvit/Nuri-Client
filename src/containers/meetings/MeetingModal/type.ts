import {StaticImageData} from "next/image";

export interface MeetingModalProps {
	title: string;
	location: string;
	description: string;
	bannerImage: string | StaticImageData;
	profileImage: string;
}