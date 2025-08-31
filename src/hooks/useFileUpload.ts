import {useState, useCallback} from "react";
// 사용 예시
// const { upload, loading, error, result } = useImageUpload();
// const handleUpload = async () => {
// 	try {
// 		const uuids = await upload(files);
// 		console.log("업로드 성공:", uuids);
// 	} catch (err) {
// 		console.error("업로드 실패", err);
// 	}
// };


export const useFileUpload = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [result, setResult] = useState<string[]>([]);
	
	const upload = useCallback(async (files: File[]) => {
		setLoading(true);
		setError(null);
		try {
			const formData = new FormData();
			files.forEach(file => formData.append("files", file));
			
			formData.append("secretKey", process.env.NEXT_PUBLIC_IMAGE_SECRET_KEY ?? "");
			const res = await fetch(process.env.NEXT_PUBLIC_IMAGE_URL ?? "", {
				method: "POST",
				body: formData,
			});
			
			if (!res.ok) {
				throw new Error("업로드 실패");
			}
			
			const data = await res.json();
			setResult(data);
			return data;
		} catch (err) {
			setError(err as Error);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);
	
	return {upload, loading, error, result};
};

