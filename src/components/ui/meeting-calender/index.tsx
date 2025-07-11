'use client';
import {useState, useEffect} from "react";
import * as S from "./style";
import Image from "next/image";
import Arrow from "@/assets/meeting/arrow.svg";
import ArrowBottom from "@/assets/meeting/arrow-bottom.svg";

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export default function MeetingCalender() {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth());
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const prevLastDay = new Date(year, month, 0).getDate();
	
	// 팝업 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = () => {
			// 팝업 열린 상태일 때만 닫기
			if (selectedIndex !== null) {
				setSelectedIndex(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selectedIndex]);
	
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
		const currentIndex = cellIndex; // 🔒 고정!
		cells.push(
			<S.DateCell key={day} onClick={(e) => handleClick(currentIndex, e)}>
				{day}
				{selectedIndex === currentIndex && (
					<S.Popup onClick={(e) => e.stopPropagation()}>
						<h3>모임이름</h3>
						<S.PopupContentBox>
							<p>날짜</p>
							<p>2025-05-15 (목)</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>비용</p>
							<p>₩ 3,000원</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>시작시간</p>
							<p>10:00</p>
						</S.PopupContentBox>
						<S.PopupContentBox>
							<p>종료시간</p>
							<p>16:00</p>
						</S.PopupContentBox>
						<p>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p>
						<S.ImgBox>
							<Image src={ArrowBottom} alt="arrow" fill/>
						</S.ImgBox>
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