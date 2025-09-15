"use client"

import React, {useEffect} from "react";
import {useIsEnteringMeetingStore} from "@/store/isEnteringMeeting";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useQuery} from "@apollo/client";
import {MeetingQueries} from "@/services/meeting";
import {Status} from "@/types/meetings";

export default function CheckUserStatus({children}: { children: React.ReactNode}) {
	const {setFree, setEnteringMeeting, setSendRequest} = useIsEnteringMeetingStore()
	const {setFind} = useOtherMeetingFind()
	const navigate = useNavigationWithProgress()
	const {data} = useQuery(MeetingQueries.GET_MEETING_STATUS)
	const status: Status = data?.getGroupStatus
	useEffect(() => {
		if(!status) return
		
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
	}, [status]);
	return children
}