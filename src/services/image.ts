import { error } from "console";

export const imageService = {
	upload: async (files: File[]) => {
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
			return data;
		} catch {
			error('이미지 업로드 중 오류가 발생했습니다.');
		}
	},
};