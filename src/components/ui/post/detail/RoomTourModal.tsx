import React, { useState } from 'react';
import { RoomTourService } from '@/services/roomTour';
import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import Image from 'next/image';
import { colors, fontSizes, zIndex } from '@/styles/theme';
import {
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	format,
	isSameDay,
	addMonths,
	startOfWeek,
	endOfWeek
} from 'date-fns';
import ArrowLeft from '@/assets/post/arrow/left.svg';
import ArrowRight from '@/assets/post/arrow/right.svg';
import { mq } from '@/styles/media';
import { useAlertStore } from "@/store/alert";

interface RoomTourModalProps {
	boardingRoomId?: string;
	onSuccess?: () => void;
}

export default function RoomTourModal({ boardingRoomId, onSuccess }: RoomTourModalProps) {
	const client = useApolloClient();
	const now = new Date();
	const rawHour = now.getHours();
	const initialPeriod = rawHour >= 12 ? 'PM' : 'AM';
	const initialHour12 = ((rawHour + 11) % 12) + 1;
	const initialMinute = now.getMinutes();

	const [viewMonth, setViewMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [hour, setHour] = useState<number>(initialHour12);
	const [minute, setMinute] = useState<number>(initialMinute);
	const [period, setPeriod] = useState<'AM' | 'PM'>(initialPeriod);

	const monthStart = startOfMonth(viewMonth);
	const monthEnd = endOfMonth(viewMonth);
	const startDate = startOfWeek(monthStart);
	const endDate = endOfWeek(monthEnd);

	const days = eachDayOfInterval({ start: startDate, end: endDate });

	const formatTime = (h: number, m: number) =>
		`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

	const { error, success } = useAlertStore();

	const handleDateClick = (day: Date, isCurrentMonth: boolean) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (!isCurrentMonth || day < today) {

			setTimeout(() => {
				error("과거 날짜는 선택할 수 없습니다.")
			}, 0);
			return;
		}
		setSelectedDate(day);
	};


	const handleSend = async () => {
		if (!boardingRoomId) {
			error('예약 정보가 올바르지 않습니다.');
			return;
		}
		const date = new Date(selectedDate);
		let hour24 = hour % 12;
		if (period === 'PM') hour24 += 12;
		date.setHours(hour24, minute, 0, 0);

		try {
			await RoomTourService.createRoomTour(client, {
				boardingRoomId,
				time: date.toISOString(),
			});
			success('룸투어 예약이 완료되었습니다.');
			onSuccess?.();
		} catch (e) {
			if (e instanceof Error) {
				error(e.message || '룸투어 예약에 실패했습니다.');
			} else {
				error(String(e) || '룸투어 예약에 실패했습니다.');
			}
		}
	};

	return (
		<Popover>
			<Title>룸투어 날짜를 선택해주세요</Title>
			<Calendar>
				<CalendarHeader>
					<MonthTitle>{format(viewMonth, 'yyyy년 M월')}</MonthTitle>
					<NavButtons>
						<NavButton onClick={() => setViewMonth(addMonths(viewMonth, -1))}>
							<Image src={ArrowLeft} alt="이전 달" width={16} height={16} />
						</NavButton>
						<NavButton onClick={() => setViewMonth(addMonths(viewMonth, 1))}>
							<Image src={ArrowRight} alt="다음 달" width={16} height={16} />
						</NavButton>
					</NavButtons>
				</CalendarHeader>

				<WeekdaysHeader>
					{['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
						<WeekdayCell
							key={day}
							isWeekend={idx === 0 || idx === 6}
							isSaturday={idx === 6}
						>
							{day}
						</WeekdayCell>
					))}
				</WeekdaysHeader>

				<DatesGrid>
					{days.map((day) => {
						const isCurrentMonth = format(day, 'M') === format(viewMonth, 'M');
						const isSelected = isSameDay(day, selectedDate);
						const isToday = isSameDay(day, new Date());
						const weekday = day.getDay();
						const isWeekend = weekday === 0 || weekday === 6;
						const isSaturday = weekday === 6;

						return (
							<DateCell
								key={day.toISOString()}
								isCurrentMonth={isCurrentMonth}
								isSelected={isSelected}
								isToday={isToday}
								isWeekend={isWeekend}
								isSaturday={isSaturday}
								onClick={() => handleDateClick(day, isCurrentMonth)}
							>
								{format(day, 'd')}
							</DateCell>
						);
					})}
				</DatesGrid>
			</Calendar>

			<TimeRow>
				<TimeLabel>시간</TimeLabel>
				<TimeSelector>
					<Select value={hour} onChange={(e) => setHour(+e.target.value)}>
						{Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
							<option key={h} value={h}>
								{h.toString().padStart(2, '0')}
							</option>
						))}
					</Select>
					<Span>:</Span>
					<Select value={minute} onChange={(e) => setMinute(+e.target.value)}>
						{Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
							<option key={m} value={m}>
								{m.toString().padStart(2, '0')}
							</option>
						))}
					</Select>
					<PeriodButtons>
						<PeriodButton active={period === 'AM'} onClick={() => setPeriod('AM')}>
							오전
						</PeriodButton>
						<PeriodButton active={period === 'PM'} onClick={() => setPeriod('PM')}>
							오후
						</PeriodButton>
					</PeriodButtons>
				</TimeSelector>
			</TimeRow>

			{!boardingRoomId ? (
				<>
					<SendButton disabled>
						<Image src={'/icons/post-detail/send.svg'} alt="Send" width={20} height={20} />
						전송
					</SendButton>
					<div style={{ color: '#e74c3c', textAlign: 'center', marginTop: 8, fontSize: 14 }}>
						예약에 필요한 정보가 없습니다. 게시글에서 진입 시에만 예약이 가능합니다.
					</div>
				</>
			) : (
				<SendButton onClick={handleSend}>
					<Image src={'/icons/post-detail/send.svg'} alt="Send" width={20} height={20} />
					전송
				</SendButton>
			)}

			<Arrow>
				<Image src="/icons/roomtour-popover-arrow.svg" alt="arrow" width={20} height={10} />
			</Arrow>
		</Popover>
	);
}

const Popover = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  width: 320px;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.10);
  padding: 1.5rem;
  z-index: ${zIndex.modal};

  ${mq.mobile} {
    bottom: unset;
    left: 0;
    top: 0.5rem;
    transform: translateX(-50%) translateY(40px);
  }
`;

const Title = styled.h2`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${colors.text};
`;

const Calendar = styled.div`
  width: 100%;
`;
const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const MonthTitle = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: ${colors.text};
`;
const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const NavButton = styled.button`
  background: none;
  border: none;
  font-size: ${fontSizes.H4};
  color: ${colors.gray};
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background: ${colors.line2};
  }
`;
const WeekdaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
`;
const WeekdayCell = styled.div<{ isWeekend: boolean; isSaturday?: boolean }>`
  text-align: center;
  padding: 0.5rem 0;
  font-size: ${fontSizes.Caption};
  font-weight: 500;
  color: ${({ isWeekend, isSaturday }) =>
		isSaturday
			? '#3B82F6'
			: isWeekend
				? colors.primary
				: colors.gray};
`;
const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 1.25rem;
`;
const DateCell = styled.button<{
	isCurrentMonth: boolean;
	isSelected: boolean;
	isToday: boolean;
	isWeekend: boolean;
	isSaturday?: boolean;
}>`
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#FFEDEF' : 'transparent')};
  color: ${({ isCurrentMonth, isSelected, isToday, isWeekend, isSaturday }) => {
		if (!isCurrentMonth) return colors.gray;
		if (isSelected) return colors.primary;
		if (isSaturday) return '#3B82F6';
		if (isWeekend) return colors.primary;
		if (isToday) return colors.primary;
		return colors.text;
	}};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  cursor: ${({ isCurrentMonth }) => (isCurrentMonth ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.Small};

  &:hover {
    background: ${({ isCurrentMonth, isSelected }) =>
		isCurrentMonth && !isSelected ? colors.line2 : isSelected ? '#FFEDEF' : 'transparent'};
  }
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;
const TimeLabel = styled.span`
  width: 3.75rem;
  font-size: ${fontSizes.Small};
  font-weight: 500;
  color: ${colors.text};
`;
const TimeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Select = styled.select`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${colors.line};
  font-size: ${fontSizes.Small};
`;
const Span = styled.span`
  font-size: ${fontSizes.Small};
`;
const PeriodButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;
const PeriodButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#FFEDEF' : 'transparent')};
  border: 1.5px solid ${({ active }) => (active ? colors.primary : colors.line)};
  border-radius: 0.5rem;
  padding: 0.1rem 0.7rem;
  font-size: ${fontSizes.Caption};
  font-weight: 600;
  color: ${({ active }) => (active ? colors.primary : colors.gray)};
  cursor: pointer;
	white-space: nowrap;

  &:hover {
    background: ${({ active }) => (active ? '#FFEDEF' : colors.line2)};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: ${fontSizes.H4};
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.25rem;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

const Arrow = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);

  ${mq.mobile} {
    top: 10px;
    left: 63%;
    bottom: auto;
    transform: translate(-50%, -100%) rotate(180deg);
  }
`;
