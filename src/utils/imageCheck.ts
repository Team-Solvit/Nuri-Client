export const imageCheck = (thumbnail?: string): string => {
	const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
	
	if (!thumbnail) return "/post/default.png";
	if (/^https:\/\//.test(thumbnail)) return thumbnail;
	return `${BASE_URL?.replace(/\/$/, "")}/${thumbnail.replace(/^\//, "")}`;
};