export function formatKoreanDateTime(isoString: string) {
	const date = new Date(isoString);
	const kstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
	
	// 요일 배열
	const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
	
	// 날짜
	const month = kstDate.getMonth() + 1;
	const day = kstDate.getDate();
	const weekday = weekdays[kstDate.getDay()];
	const formattedDate = `${month}월 ${day}일 (${weekday})`;
	
	// 시간
	let hours = kstDate.getHours();
	const minutes = kstDate.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "오후" : "오전";
	if (hours > 12) hours -= 12;
	if (hours === 0) hours = 12;
	const formattedTime = `${ampm} ${hours}:${minutes}`;
	
	return {date: formattedDate, time: formattedTime};
}