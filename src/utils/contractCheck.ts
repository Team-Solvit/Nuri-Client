import {Contract} from "@/types/message";

export const contractCheck = (contents: string): Contract | null  => {
	const isJson = contents.trim().startsWith('{') && contents.trim().endsWith('}');
	if (!isJson) return null;
	try {
		const obj = JSON.parse(contents);
		const { type, roomId, hostId, contractPeriod, expiryDate, status, contractId, thumbnail, boardingHouseName, roomName, boarderName, price, area } = obj;
		return { type, roomId, hostId, contractPeriod, expiryDate, status, contractId, thumbnail, boardingHouseName, roomName, boarderName, price, area };
	} catch (e) {
		console.error("Invalid contract format:", e);
		return null;
	}
};

// {"type":"contract",
// "roomId":"ec28b579-01b4-433d-b3e1-647235108f46",
// "hostId":"host",
// "contractPeriod":12,
// "expiryDate":"2026-09-24T15:03:29.659",
// "status":"PENDING",
// "contractId":"71a75607-03ef-4018-bffa-8792af867c2b",
// "thumbnail":"https://teachmon.kro.kr","
// boardingHouseName":"그랜마하우스",
// "roomName":"그랜마 하우스 (309호)",
// "boarderName":"오주현",
// "price":10,
// "area":"부산광역시 수영구 좌수영로 176"
// }
