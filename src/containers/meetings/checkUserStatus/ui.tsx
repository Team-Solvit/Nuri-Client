"use client"

import {useState, useEffect} from "react";
import {useIsEnteringMeetingStore} from "@/store/isEnteringMeeting";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {Status} from "@/types/meetings";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";
import {useUserStore} from "@/store/user";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useParams} from "next/navigation";

export default function CheckUserStatus({children}: { children: React.ReactNode}) {
	const {setFree, setEnteringMeeting, setSendRequest} = useIsEnteringMeetingStore()
	const {setMeetingId} = useSelectOtherMeetingDetailStore()
	const navigate = useNavigationWithProgress()
	const {id} = useUserStore()
	const params = useParams()
	
	const { data } = useQuery(MeetingQueries.GET_MEETING_STATUS, {
		skip: !id,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "cache-and-network", 
		nextFetchPolicy: "cache-first",  
	});
	const status: Status = data?.getGroupStatus
	const {find} = useOtherMeetingFind()
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		if (!id || !status) {
			setIsLoading(false);
			return;
		}
		if(!find){
			navigate(`/meetings/${status.groupId}`)
			setEnteringMeeting(status?.groupName || "")
		}
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
	}, [id, status, params, find, navigate, setMeetingId, setEnteringMeeting, setSendRequest, setFree]);
	 if (isLoading) return null;
	 return children;
}