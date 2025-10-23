import { toZonedTime } from 'date-fns-tz';

export function parseKST(datetimeStr:string) {
	const kstDate = toZonedTime(datetimeStr, 'Asia/Seoul');
	return {
		year: kstDate.getFullYear(),
		month: kstDate.getMonth() + 1,
		day: kstDate.getDate(),
		hour: kstDate.getHours(),
		minute: kstDate.getMinutes(),
	};
}