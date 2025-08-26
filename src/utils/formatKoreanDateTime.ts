export function formatKoreanDateTime(isoString: string) {
	const date = new Date(isoString);
	
	// 요일 배열
	const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
	
	// 날짜
	const month = date.getMonth() + 1; // 월은 0부터 시작
	const day = date.getDate();
	const weekday = weekdays[date.getDay()];
	const formattedDate = `${month}월 ${day}일 (${weekday})`;
	
	// 시간
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "오후" : "오전";
	if (hours > 12) hours -= 12;
	if (hours === 0) hours = 12;
	const formattedTime = `${ampm} ${hours}:${minutes}`;
	
	return {date: formattedDate, time: formattedTime};
}