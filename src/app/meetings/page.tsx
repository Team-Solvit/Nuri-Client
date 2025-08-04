"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GoogleMap from "@/components/ui/googleMap/Map";
import MeetingsSidebar from "@/containers/meetings/sidebar/ui";
import MeetingModal from "@/containers/meetings/MeetingModal/ui";
import MeetingAccession from "@/containers/meetings/accession/ui";
import {Accession} from "@/containers/meetings/accession/type";

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
	const fakeData = [
		{id: 1, title: "다함께 놀자 동네", content: "누구보다 재미있게", personnel: 2, maxPersonnel: 3},
		{id: 2, title: "모임2", content: "누구보다 상냥하게", personnel: 1, maxPersonnel: 3},
	]
	const [isAccession, setIsAccession] = useState(false);
	const AccessionData: Accession = {
		id: 1,
		title: "다함께dddddddddd 놀자 동네",
		content: "dajflkdjskfjfj",
		personnel: 2,
		maxPersonnel: 3
	}
	return (
		<>
			<GoogleMap markers={markers} label={(m) => rooms[m.id - 1].title} renderPopup={(marker: typeof markers[0]) => (
				<MeetingsSidebar rooms={rooms[marker.id - 1].title} meetings={fakeData}/>
			)}>
			</GoogleMap>
			<MeetingAccession accessions={AccessionData} isAccession={isAccession} setIsAccession={setIsAccession}/>
			<MeetingModal {...{...fakeData, setIsAccessionAction: setIsAccession}} />
		</>
	)
}