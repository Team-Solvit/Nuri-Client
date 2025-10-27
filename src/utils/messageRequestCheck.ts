import {Contract, RoomTour} from "@/types/message";
import {parseKST} from "@/utils/dateTime";

export const messageRequestCheck = (contents: string): Contract |RoomTour| null  => {
	const isJson = contents.trim().startsWith('{') && contents.trim().endsWith('}');
	if (!isJson) return null;
	try {
		const data = JSON.parse(contents);
		if (data.type === "contract") {
			if (!data.roomId || !data.hostId || !data.status) {
				console.error("Invalid contract data structure:", data);
				return null;
			}
			data.time = parseKST(data?.expiryDate);
			return data as Contract;
		} else if (data.type === "roomTour") {
			if (!data.roomId || !data.time || !data.status) {
				console.error("Invalid roomTour data structure:", data);
				return null;
			}
			data.time = parseKST(data?.time);
			return data as RoomTour;
		}
		return null;
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
