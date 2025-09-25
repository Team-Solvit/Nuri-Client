export function parseKST(datetimeStr:string) {
	// 문자열 → Date 객체
	const date = new Date(datetimeStr);
	// 한국 시간 기준으로 변환 (UTC+9)
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1; // 0~11 → +1
	const day = date.getUTCDate();
	const hour = date.getUTCHours() + 9; // KST = UTC + 9
	const minute = date.getUTCMinutes();
	
	// 시가 24 이상이면 다음 날로 처리
	const kHour = hour >= 24 ? hour - 24 : hour;
	const kDay = hour >= 24 ? day + 1 : day;
	
	return {
		year,
		month,
		day: kDay,
		hour: kHour,
		minute,
	};
}