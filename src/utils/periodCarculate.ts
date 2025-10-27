export function convertToContractString(periods: number[]): string[] {
	return periods.map((num) => {
		const years = Math.floor(num / 12);
		const months = num % 12;
		let result = "";
		
		if (years > 0) result += `${years}년`;
		if (months > 0) result += `${months}개월`;
		
		return result || "0개월"; // 0개월 처리
	});
}