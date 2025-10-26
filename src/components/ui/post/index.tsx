"use client"

import * as S from './style';
import Image from 'next/image'
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

interface PostProps {
	post: {
		postId: string;
		thumbnail: string;
	};
}

export default function Post({post}: PostProps) {
	
	const navigate = useNavigationWithProgress();
	
	return (
		<S.Post onClick={() => navigate(`/post/${post.postId}`)}>
			<S.PostImg>
				<Image
					src={process.env.NEXT_PUBLIC_IMAGE_URL + post?.thumbnail}
					alt="thumbnail"
					fill
					style={{objectFit: "cover", objectPosition: "center"}}
				/>
			</S.PostImg>
		</S.Post>
	);
}