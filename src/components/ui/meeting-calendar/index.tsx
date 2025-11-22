'use client';
import {useState, useEffect, useRef} from "react";
import * as S from "./style";
import Image from "next/image";
import Arrow from "@/assets/meeting/arrow.svg";
import ArrowBottom from "@/assets/meeting/arrow-bottom.svg";
import {breakpoints} from "@/styles/media";
import Flag from "@/assets/icon/flag.svg";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {MeetingMutations, MeetingQueries} from "@/services/meeting";
import {convertMeetingsToTimeOnly} from "@/utils/meetingCaleander";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";
import {useAlertStore} from "@/store/alert";
import {useLoadingEffect} from "@/hooks/useLoading";
import {MeetingCalendarProps} from "@/types/meetings";

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export default function MeetingCalender({groupId}: { groupId: string }) {
	
	const {data: meetingSchedule, loading} = useQuery(MeetingQueries.GET_MEETING_SCHEDULE, {
		variables: {
			groupId: groupId
		},
		fetchPolicy: "no-cache",  
    	nextFetchPolicy: "no-cache",
		skip: !groupId,
	})
	const upcomingGroupSchedules = meetingSchedule?.getUpcomingGroupSchedules
	
	useLoadingEffect(loading)
	const [complete, setComplete] = useState(false);
	const [schedule, setSchedule] = useState<Record<string, MeetingCalendarProps>>({});
	useEffect(() => {
		if(!upcomingGroupSchedules) return;
		setSchedule(convertMeetingsToTimeOnly(upcomingGroupSchedules) ?? {})
	}, [upcomingGroupSchedules]);
	
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth());
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const prevLastDay = new Date(year, month, 0).getDate();
	
	
	const popupRef = useRef<HTMLDivElement>(null);
	// 팝업 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				setSelectedIndex(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	
	const [getSchedule, { data : isPart, loading : isPartLoading }] = useLazyQuery(
		MeetingQueries.GET_IS_PARTICIPATING_GROUP_SCHEDULE
	);
	
	useEffect(() => {
		if(!isPart) return;
		setComplete(isPart?.isParticipatingGroupSchedule)
	}, [isPart?.isParticipatingGroupSchedule]);
	
	const handleCellDetailClick = async (i: number, e: React.MouseEvent, scheduleId : string ) => {
		e.stopPropagation();
		if (!scheduleId) return;
		setSelectedIndex(i);
		await getSchedule({
			variables:{
				scheduleId: scheduleId
			}
		})
	};
	
	const prevMonth = () => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}
	};
	
	const nextMonth = () => {
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}
	};
	
	const cells = [];
	let cellIndex = 0;
	
	// 이전달 날짜
	for (let i = firstDay - 1; i >= 0; i--) {
		const day = prevLastDay - i;
		cells.push(
			<S.DateCell key={`prev-${day}`} isOutside>
				{day}
			</S.DateCell>
		);
		cellIndex++;
	}
	const [joinMeetingRequest, {data : joinResponse, loading: joinLoading}] = useMutation(MeetingMutations.JOIN_MEETING_SCHEDULE_REQUEST)
	const [cancelMeetingRequest, {data : cancelResponse, loading: cancelLoading}] = useMutation(MeetingMutations.CANCEL_MEETING_SCHEDULE_REQUEST)
	
	useEffect(() => {
		if(joinResponse?.joinGroupSchedule){
			setComplete(true)
		}
		else if(cancelResponse?.cancelGroupScheduleParticipation){
			setComplete(false)
		}
	}, [joinResponse?.joinGroupSchedule, cancelResponse?.cancelGroupScheduleParticipation]);
	
	
	const {find} = useOtherMeetingFind()
	const {success} = useAlertStore()
	const handlePart = async (e : React.MouseEvent, mode:"참가" | "불참가", scheduleId : string) =>{
		e.stopPropagation();
		if (!scheduleId) return;
		if(mode === "참가"){
			await joinMeetingRequest({
				variables:{
					scheduleId: scheduleId,
				}
			});
			setSelectedIndex(null);
			success("일정에 참가하였습니다.")
		}else if(mode === "불참가"){
			await cancelMeetingRequest({
				variables:{
					scheduleId: scheduleId
				}
			});
			setSelectedIndex(null);
			success("일정 참가를 취소했습니다.")
		}
	}
	// 이번달 날짜
	for (let day = 1; day <= daysInMonth; day++) {
		const currentIndex = cellIndex;
		const date = new Date(year, month, day).toLocaleDateString("ko-KR");
		const s = schedule[date]
		cells.push(
			<S.DateCell
				style={{ cursor: (date in schedule) ? "pointer" : "default" }}
				key={day}
				onClick={(e) => (s?.scheduleId ? handleCellDetailClick(currentIndex, e, s.scheduleId) : undefined)}
			>
				{day}
				{
					date in schedule &&
					(typeof window !== 'undefined' && breakpoints.mobile <= window.innerWidth) ?
						<S.Schedule>
							{s?.title}
						</S.Schedule> :
						date in schedule &&
            <S.Schedule>
              <Image src={Flag} alt="flag" width={16} height={16}/>
            </S.Schedule>
				}
				
				{date in schedule && selectedIndex === currentIndex && (
					<S.Popup
						onClick={(e) => e.stopPropagation()}
						ref={popupRef}
					>
						<h3>{s?.title}</h3>
						<S.PopupContentBox>
							<p>날짜</p>
							<p>{date}</p>
						</S.PopupContentBox>
						{/*<S.PopupContentBox>*/}
							{/*<p>비용</p>*/}
							{/*<p>₩ {meetings[date].cost}원</p>*/}
						{/*</S.PopupContentBox>*/}
						<S.PopupContentBox>
							<p>시작시간</p>
							<p>{s?.startTime}</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>종료시간</p>
							<p>{s?.endTime}</p>
						</S.PopupContentBox>
						<p>{s?.description}</p>
						{!find && !isPartLoading ?
							<S.ButtonContainer>
								{
									complete ?
										<S.PartButton
											onClick={(e) => handlePart(e, "불참가", schedule[date]?.scheduleId)}
											disabled={cancelLoading}
										>
											{cancelLoading ? "취소 중..." : "참가 취소하기"}
										</S.PartButton>
										:
										<S.PartButton
											onClick={(e) => handlePart(e, "참가", schedule[date]?.scheduleId)}
											disabled={joinLoading}
										>
											{joinLoading ? "참가 중..." : "참가하기"}
										</S.PartButton>
								}
							</S.ButtonContainer>
							: null
						}
						{breakpoints.mobile <= window.innerWidth &&
              <S.ImgBox>
                <Image src={ArrowBottom} alt="arrow" fill/>
              </S.ImgBox>
						}
					</S.Popup>
				)}
			</S.DateCell>
		);
		cellIndex++;
	}
	
	// 다음달 날짜
	const targetCells = cellIndex <= 35 ? 35 : 42;
	const addCount = targetCells - cellIndex;
	for (let i = 1; i <= addCount; i++) {
		cells.push(
			<S.DateCell key={`next-${i}`} isOutside>
				{i}
			</S.DateCell>
		);
		cellIndex++;
	}
	return (
		<S.MeetingCalenderContainer>
			<S.CalendarHeader>
				<S.Arrow style={{transform: 'rotate(180deg)'}} onClick={prevMonth}>
					<Image src={Arrow} alt="arrow" width={20} height={20}/>
				</S.Arrow>
				<h2>{year}년 {month + 1}월</h2>
				<S.Arrow onClick={nextMonth}>
					<Image src={Arrow} alt="arrow" width={20} height={20}/>
				</S.Arrow>
			</S.CalendarHeader>
			
			<S.Weekdays>
				{weekdays.map((day, i) => (
					<S.Weekday key={i} isSunday={i === 0} isSaturday={i === 6}>
						{day}
					</S.Weekday>
				))}
			</S.Weekdays>
			
			<S.Grid>{cells}</S.Grid>
		</S.MeetingCalenderContainer>
	);
}