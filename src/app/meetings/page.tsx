"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GoogleMap from "@/components/ui/googleMap/Map";
import MeetingsSidebar from "@/containers/meetings/sidebar/ui";
import MeetingModal from "@/containers/meetings/MeetingModal/ui";
import MeetingAccession from "@/containers/meetings/accession/ui";
import {Accession} from "@/containers/meetings/accession/type";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";

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
	const {data: areas} = useQuery(MeetingQueries.GET_MEETING_AREAS);
	
	const {data: areaMeetings} = useQuery(MeetingQueries.GET_MEETINGS, {
		variables: {
			areaId: 1
		}
	});
	console.log('지역(areas):', areas) // 지역(areas) 데이터 출력
	console.log('지역별 모임(areaMeetings):', areaMeetings) // 지역별 모임(areaMeetings) 데이터 출력
	
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