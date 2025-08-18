'use client'

import * as S from './style';
import Image from 'next/image'
import {useState, useEffect} from 'react';
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

interface PostProps {
	post: {
		id: number;
		thumbnail: string;
	};
}

export default function Post({post}: PostProps) {
	const [isMobile, setIsMobile] = useState(false);
	
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 430);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	const navigate = useNavigationWithProgress();
	
	return (
		<S.Post onClick={() => navigate(`/post/${post.id}`)}>
			<S.PostImg style={isMobile ? {width: '46vw', height: '21vh'} : {}}>
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