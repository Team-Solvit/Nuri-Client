import {Contract} from "@/types/message";

export const contractCheck = (contents: string): Contract | null  => {
	const isJson = contents.trim().startsWith('{') && contents.trim().endsWith('}');
	if (!isJson) return null;
	try {
		const obj = JSON.parse(contents);
		const { type, roomId, hostId, contractPeriod, expiryDate, status, contractId, thumbnail } = obj;
		return { type, roomId, hostId, contractPeriod, expiryDate, status, contractId, thumbnail };
	} catch (e) {
		console.error("Invalid contract format:", e);
		return null;
	}
};

// {"type":"contract","roomId":"ec28b579-01b4-433d-b3e1-647235108f46","hostId":"host","contractPeriod":6,"expiryDate":"2026-03-23T02:28:29.901","status":"PENDING","contractId":"433c8c30-cac4-42a5-8ded-04fb24d7a6cb","thumbnail":"https://teachmon.kro.kr"}
