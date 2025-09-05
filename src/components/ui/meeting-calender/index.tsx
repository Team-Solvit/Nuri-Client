'use client';
import {useState, useEffect, useRef} from "react";
import * as S from "./style";
import Image from "next/image";
import Arrow from "@/assets/meeting/arrow.svg";
import ArrowBottom from "@/assets/meeting/arrow-bottom.svg";
import {breakpoints} from "@/styles/media";
import Flag from "@/assets/icon/flag.svg";
import {useMeetingStore} from "@/store/meetingData";
import {useOtherMeetingFind} from "@/store/otherMeetingFind";

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export default function MeetingCalender() {
	const {meeting} = useMeetingStore()
	const meetings = meeting?.event
	console.log(meetings)
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth());
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const prevLastDay = new Date(year, month, 0).getDate();
	const {find} = useOtherMeetingFind()
	const [complete, setComplete] = useState(false)
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
	
	if(!meetings) return
	const handleClick = (i: number, e: React.MouseEvent) => {
		e.stopPropagation(); // 외부 클릭 방지
		setSelectedIndex(i);
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
	
	// 이번달 날짜
	for (let day = 1; day <= daysInMonth; day++) {
		const currentIndex = cellIndex;
		let date = new Date(year, month, day).toLocaleDateString("ko-KR");
		date = date
			.replace(/\s+/g, "")
			.replace(/\.$/, "")
			.split(".")
			.map((part, idx) => (idx === 0 ? part : part.padStart(2, "0")))
			.join(".");
		
		cells.push(
			<S.DateCell
				style={{cursor: meetings[currentIndex] ? "pointer" : "default"}}
				key={day}
				onClick={(e) => handleClick(currentIndex, e)}
			>
				{day}
				{
					date in meetings &&
					breakpoints.mobile <= window.innerWidth ?
						<S.Schedule>
							{meetings[date]?.title}
						</S.Schedule> :
						date in meetings &&
            <S.Schedule>
              <Image src={Flag} alt="flag" width={16} height={16}/>
            </S.Schedule>
				}
				
				{date in meetings && selectedIndex === currentIndex && (
					<S.Popup ref={popupRef} onClick={(e) => e.stopPropagation()}>
						<h3>{meetings[date].title}</h3>
						<S.PopupContentBox>
							<p>날짜</p>
							<p>{meetings[date].date}</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>비용</p>
							<p>₩ {meetings[date].cost}원</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>시작시간</p>
							<p>{meetings[date].startTime}</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>종료시간</p>
							<p>{meetings[date].endTime}</p>
						</S.PopupContentBox>
						<p>{meetings[date].description}</p>
						{breakpoints.mobile <= window.innerWidth &&
              <S.ImgBox>
                <Image src={ArrowBottom} alt="arrow" fill/>
              </S.ImgBox>
						}
						{!find ?
							<S.ButtonContainer>
								{
									!complete ?
										<>
											<S.LeaveButton onClick={(e) => {
												e.stopPropagation();
												setComplete(true)
											}}>불참가하기</S.LeaveButton>
											<S.JoinButton onClick={(e) => {
												e.stopPropagation();
												setComplete(true)
											}}>참가하기</S.JoinButton>
										</> :
										<S.CompleteButton>참가완료</S.CompleteButton>
								}
								
						</S.ButtonContainer>
							: null
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