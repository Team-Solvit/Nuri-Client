"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Map from "@/components/ui/googleMap/Map";
import MeetingsSidebar from "@/containers/meetings/sidebar/ui";
import MeetingModal from "@/containers/meetings/MeetingModal/ui";

export default function Meetings() {
	const navigate = useRouter();
	useEffect(() => {
		if (localStorage.getItem("token")) {
			// 나중에 조건과 동시에 이동 url 교체하기
			navigate.push("/meetings/1");
		}
	}, []);
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
	return (
		<>
			<Map markers={markers} label={(m) => rooms[m.id - 1].title} renderPopup={(marker: typeof markers[0]) => (
				<MeetingsSidebar rooms={rooms[marker.id - 1].title}/>
			)}>
			</Map>
			<MeetingModal/>
		</>
	)
}