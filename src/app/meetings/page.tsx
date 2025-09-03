"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GoogleMap from "@/components/ui/googleMap/Map";
import MeetingsSidebar from "@/containers/meetings/sidebar/ui";
import MeetingModal from "@/containers/meetings/MeetingModal/ui";
import MeetingAccession from "@/containers/meetings/accession/ui";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {AccessionData, Meeting} from "@/containers/meetings/accession/type";

export default function Meetings() {
	const navigate = useRouter();
	const {find} = useOtherMeetingFind();
	useEffect(() => {
		if (!find) {
			navigate.push("/meetings/1");
		}
	}, [find]);
	const markers = [
		{
			id: 1,
			position: {lat: 35.13340833, lng: 129.0865},
		},
		{
			id: 2,
			position: {lat: 35.1868, lng: 129.0115},
		},
	]
	const rooms = [
		{
			id: 1,
			title: "남구",
		},
		{
			id: 2,
			title: "북구",
		},
	]
	const fakeData: Meeting[] = [
		{
			id: 1,
			title: "웃음가득 모임",
			content: "누구보다 재미있게",
			personnel: 2,
			maxPersonnel: 3,
			img: "/meeting/profile.png",
			banner: "/meeting/banner.png",
			location: "부산광역시 남구 용호동",
			post: [
				{
					id: 1,
					thumbnail: "/meeting/post3.jpeg"
				},
				{
					id: 2,
					thumbnail: "/meeting/post4.jpg"
				},
				{
					id: 10,
					thumbnail: "/meeting/post10.jpeg"
				}
			],
			event: {
				"2025.09.10": {
					id: 1,
					title: "정기 모임",
					date: "2025-09-10",
					cost: 10000,
					startTime: "14:00",
					endTime: "16:00",
					description: "첫 번째 정기 모임입니다!"
				}
			},
			member: [
				{
					id: 1,
					name: "홍길동",
					게시물: 12,
					팔로워: 45,
					팔로우: 23
				},
				{
					id: 2,
					name: "김철수",
					게시물: 8,
					팔로워: 32,
					팔로우: 15
				}
			]
		},
		{
			id: 2,
			title: "한가족 모임",
			content: "가족같은 모임입니다!",
			personnel: 1,
			maxPersonnel: 3,
			img: "/meeting/meting-banner2.jpg",
			banner: "/meeting/meting-banner2.jpg",
			location: "부산광역시 남구 대연동",
			post: [
				{
					id: 3,
					thumbnail: "/meeting/post5.jpg"
				},
				{
					id: 4,
					thumbnail: "/meeting/post6.jpeg"
				},
				{
					id: 5,
					thumbnail: "/meeting/post7.jpg"
				},
				{
					id: 6,
					thumbnail: "/meeting/post8.jpeg"
				},
				{
					id:7,
					thumbnail: "/meeting/post9.jpeg"
				}
			],
			event: {
				"2025.09.15": {
					id: 2,
					title: "가족 모임",
					date: "2025-09-15",
					cost: 15000,
					startTime: "12:00",
					endTime: "15:00",
					description: "가족같은 분위기에서 즐거운 시간 보내요!"
				}
			},
			member: [
				{
					id: 3,
					name: "이영희",
					게시물: 5,
					팔로워: 28,
					팔로우: 19
				}
			]
		}
	];
	const [isAccession, setIsAccession] = useState<AccessionData>({
		status : false,
		idx : null
	});
	const handleAccession = (bool: boolean, idx: number) => {
		setIsAccession({
			status: bool,
			idx: idx,
	});
	};
	return (
		<>
			<GoogleMap markers={markers} label={(m) => rooms[m.id - 1].title} renderPopup={(marker: typeof markers[0]) => (
				<MeetingsSidebar rooms={rooms[marker.id - 1].title} meetings={fakeData}/>
			)}>
			</GoogleMap>
			<MeetingAccession accessions={fakeData} isAccession={isAccession} setIsAccession={setIsAccession}/>
			<MeetingModal fakeData={fakeData} setIsAccessionAction={handleAccession} />
		</>
	)
}