"use client";

import * as S from "./style";
import {fakeData} from "@/containers/home/post-scroll/data";
import Image from "next/image";
import Square from "@/components/ui/button/square";
import Heart from "@/assets/post/heart.svg";
import Comment from "@/assets/post/comment.svg";
import Arrow from "@/assets/post/arrow-right.svg";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function PostScroll() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const navigate = useRouter();
	const navigateClick = (path: string) => {
		navigate.push(path);
	}
	const [imageIndexMap, setImageIndexMap] = useState<Record<number, number>>({});
	
	const handleMouseEnter = (id: number) => setHoverIndex(id);
	const handleMouseLeave = () => setHoverIndex(null);
	
	const handleSlide = (postId: number, direction: "next" | "prev") => {
		setImageIndexMap(prev => {
			const current = prev[postId] || 0;
			const images = fakeData.find(p => p.id === postId)?.thumbnail || [];
			const max = images.length - 1;
			
			const next =
				direction === "next"
					? (current + 1) % (max + 1)
					: (current - 1 + max + 1) % (max + 1);
			
			return {...prev, [postId]: next};
		});
	};
	return (
		<S.PostScrollContainer>
			{fakeData.map(post => {
				const currentIndex = imageIndexMap[post.id] || 0;
				return (
					<S.Post
						key={post.id}
						onClick={() => navigateClick(`/post/${post.id}`)}
					>
						<S.PostTitle>
							<S.Profile onClick={(e) => e.stopPropagation()}>
								<S.Thumbnail>
									<Image
										src={post.user.thumbnail}
										alt={"user thumbnail"}
										fill
										style={{objectFit: "cover"}}
									/>
								</S.Thumbnail>
								<S.User>
									<p>{post.user.userId}</p>
									<p>{post.date}</p>
								</S.User>
							</S.Profile>
							<S.Nav onClick={(e) => e.stopPropagation()}>
								<p>{post.subject}</p>
								<Square text={"채팅하기"} onClick={() => {
								}} status={true} width={"100px"}/>
							</S.Nav>
						</S.PostTitle>
						<S.PostImg
							onClick={(e) => e.stopPropagation()}
							onMouseEnter={() => handleMouseEnter(post.id)}
							onMouseLeave={handleMouseLeave}
						>
							{/* Left Arrow: index > 0일 때만 */}
							{currentIndex > 0 && (
								<S.Arrow
									isHover={hoverIndex === post.id}
									status={false}
									onClick={() => {
										handleSlide(post.id, "prev");
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{objectFit: "cover"}}/>
								</S.Arrow>
							)}
							
							{/* Slide 이미지 */}
							<S.SliderWrapper>
								<S.SliderTrack index={currentIndex}>
									{post.thumbnail.map((src, i) => (
										<S.Slide key={i}>
											<Image
												src={src}
												alt={`slide-${i}`}
												fill
												style={{objectFit: "cover"}}
											/>
										</S.Slide>
									))}
								</S.SliderTrack>
							</S.SliderWrapper>
							
							{/* Right Arrow: index < 마지막일 때만 */}
							{currentIndex < post.thumbnail.length - 1 && (
								<S.Arrow
									isHover={hoverIndex === post.id}
									status={true}
									onClick={() => {
										handleSlide(post.id, "next");
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{objectFit: "cover"}}/>
								</S.Arrow>
							)}
						</S.PostImg>
						
						<S.PostInfo onClick={(e) => e.stopPropagation()}>
							<S.Interactive>
								<S.Inter>
									<Image src={Heart} alt="like" width={28} height={28}/>
									<p>0</p>
								</S.Inter>
								<S.Inter>
									<Image src={Comment} alt="comment" width={24} height={24}/>
									<p>0</p>
								</S.Inter>
							</S.Interactive>
							{post.price && <p>₩ 월 / {post.price}</p>}
						</S.PostInfo>
						<S.PostName>{post.title}</S.PostName>
						<S.PostDesc>{post.desc}</S.PostDesc>
					</S.Post>
				)
			})}
		</S.PostScrollContainer>
	);
}