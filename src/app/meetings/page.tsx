"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import GoogleMap from "@/components/ui/googleMap/Map";
import MeetingsSidebar from "@/containers/meetings/sidebar/ui";
import MeetingModal from "@/containers/meetings/MeetingModal/ui";
import MeetingAccession from "@/containers/meetings/accession/ui";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {useLoadingEffect} from "@/hooks/useLoading";
import {AreaResponse, M, Marker} from "@/types/meetings";
import {useMeetingAccessionStore} from "@/store/meetingAccessionData";

export default function Meetings() {
	const [loading, setLoading] = useState(false);
	const navigate = useRouter();
	const {find} = useOtherMeetingFind();
	useEffect(() => {
		if (!find) {
			navigate.push("/meetings/1");
		}
	}, [find]);
	const [isAccession, setIsAccession] = useState(false);
	
	const changeAreaInitial = () => {
		setLoading(true)
		if(!areas) return;
		const newMarkers = areas.getAreas.map((area, idx) => ({
			id: idx,
			position: {lat: area.latitude, lng: area.longitude},
		}));
		setMarkers(newMarkers);
		
		const newMeetings = areas.getAreas.map((area, idx) => ({
			id : idx,
			title: area.area,
		}))
		setMeetings(newMeetings)
		setLoading(false)
	}
	const {data: areas, loading : getAreasLoading} = useQuery<AreaResponse>(MeetingQueries.GET_MEETING_AREAS);
	useEffect(() => {
		if(areas){
			changeAreaInitial();
		}
	}, [areas?.getAreas?.length]);
	
	const [markers, setMarkers] = useState<Marker[]>([])
	const [meetings, setMeetings] = useState<M[]>([])
	const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
	
	const {data: areaMeetings, loading : getAreaMeetingsLoading} = useQuery(MeetingQueries.GET_MEETINGS, {
		variables: {
			area: selectedMarker ? meetings[selectedMarker.id]?.title : "",
		},
		skip: !selectedMarker,
	});
	const {accessMeeting} = useMeetingAccessionStore()
	useLoadingEffect(getAreaMeetingsLoading || getAreasLoading || loading)
	const meetingsData = areaMeetings?.getGroupsByArea;
	if(loading) return null;
	return (
		<>
			<GoogleMap onMarkerSelect={(m) => setSelectedMarker(m)} markers={markers} label={(m) => meetings[m.id].title} renderPopup={(marker: typeof markers[0]) => (
				<MeetingsSidebar isLoading={getAreaMeetingsLoading} rooms={meetings[marker.id].title} meetings={meetingsData}/>
			)}>
			</GoogleMap>
			<MeetingAccession accessions={accessMeeting} isAccession={isAccession} setIsAccession={setIsAccession}/>
			<MeetingModal {...{setIsAccessionAction: setIsAccession}} />
		</>
	)
}