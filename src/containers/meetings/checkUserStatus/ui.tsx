"use client"

import React, {useEffect} from "react";
import {useIsEnteringMeetingStore} from "@/store/isEnteringMeeting";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

export default function CheckUserStatus({children}: { children: React.ReactNode}) {
	const {setFree, setEnteringMeeting, setSendRequest, isEnteringMeeting} = useIsEnteringMeetingStore()
	const {setFind} = useOtherMeetingFind()
	const navigate = useNavigationWithProgress()
	// 상태 불러오는 쿼리짜기
	useEffect(() => {
		// 만약 상태가 어떻다면 각각의 상황 적용하기
	}, []);
	useEffect(() => {
		if(isEnteringMeeting) {
			setFind(false)
			navigate(`/meetings/${id}`)
		}
	}, [isEnteringMeeting]);
	return <>
		{children}
	</>
}