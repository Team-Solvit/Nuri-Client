import {MeetingCalenderProps} from "@/components/ui/meeting-calender/data";

export interface AccessionProps {
	isAccession: AccessionData
	setIsAccession: (isAccession: AccessionData) => void
	accessions: Meeting[],
}
export interface AccessionData {
	status: boolean;
	idx: number | null;
}
export interface Meeting {
	id: number;
	title: string;
	content: string;
	personnel: number;
	maxPersonnel: number;
	img: string;
	banner: string;
	location : string;
	post:Post[];
	event :Record<string, MeetingCalenderProps>
	member:UserData[]
}
export interface Post{
	id:number;
	thumbnail:string;
}

type UserData = {
	id: number;
	name: string;
	게시물: number;
	팔로워: number;
	팔로우: number;
};