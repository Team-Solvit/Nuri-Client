import * as S from './style';
import Image from 'next/image'
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

interface PostProps {
	post: {
		id: number;
		thumbnail: string;
	};
}

export default function Post({post}: PostProps) {
	
	const navigate = useNavigationWithProgress();
	
	return (
		<S.Post onClick={() => navigate(`/post/${post.id}`)}>
			<S.PostImg>
				<Image
					src={post.thumbnail}
					alt="thumbnail"
					fill
					style={{objectFit: "cover", objectPosition: "center"}}
				/>
			</S.PostImg>
		</S.Post>
	);
}