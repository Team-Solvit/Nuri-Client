"use client"

import {useState, useEffect} from "react";
import {useIsEnteringMeetingStore} from "@/store/isEnteringMeeting";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {Status} from "@/types/meetings";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import {useUserStore} from "@/store/user";

export default function CheckUserStatus({children}: { children: React.ReactNode}) {
	const {setFree, setEnteringMeeting, setSendRequest} = useIsEnteringMeetingStore()
	const {setMeetingId} = useSelectOtherMeetingDetailStore()
	const navigate = useNavigationWithProgress()
	const {id} = useUserStore()
	
	const { data } = useQuery(MeetingQueries.GET_MEETING_STATUS, {
		skip: !id,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "cache-and-network", 
		nextFetchPolicy: "cache-first",  
	});
	const status: Status = data?.getGroupStatus
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		if(!status) return
		setMeetingId(status.groupId || "")
		if(status.hasGroup){
			navigate(`/meetings/${status.groupId}`)
			setEnteringMeeting(status?.groupName || "")
		}else if(!status.hasGroup){
			if(status.groupId){
				setSendRequest(status?.groupName || "")
			}
			else{
				setFree()
			}
		}
		setIsLoading(false)
	}, [status]);
	if(isLoading && id) return null;
	return children
}