"use client"

import {useState, useEffect} from "react";
import {useIsEnteringMeetingStore} from "@/store/isEnteringMeeting";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {Status} from "@/types/meetings";
import {useSelectOtherMeetingDetailStore} from "@/store/selectOtherMeetingDetail";

export default function CheckUserStatus({children}: { children: React.ReactNode}) {
	const {setFree, setEnteringMeeting, setSendRequest} = useIsEnteringMeetingStore()
	const {setFind} = useOtherMeetingFind()
	const {setMeetingId} = useSelectOtherMeetingDetailStore()
	const navigate = useNavigationWithProgress()
	const {data} = useQuery(MeetingQueries.GET_MEETING_STATUS)
	const status: Status = data?.getGroupStatus
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		if(!status) return
		setMeetingId(status.groupId || "")
		if(status.hasGroup){
			navigate(`/meetings/${status.groupId}`)
			setFind(false)
			setEnteringMeeting()
		}else if(!status.hasGroup){
			setFind(true)
			if(status.groupId){
				setSendRequest(status?.groupName || "")
			}
			else{
				setFree()
			}
		}
		setIsLoading(false)
	}, [status]);
	if(isLoading) return null;
	return children
}