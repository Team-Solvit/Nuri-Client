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
import {useQuery} from "@apollo/client";
import {PostQueries} from "@/services/post";
import type {GetPostListResponse, GetPostListVariables} from "@/types/post";

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
		if (postId === null) return;
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
	
	const {data: postData} = useQuery<GetPostListResponse, GetPostListVariables>(
		PostQueries.GET_POST_LIST,
		{variables: {start: 0}}
	);
	const posts = postData?.getPostList;
	console.log(posts, postData);
	return (
		<S.PostScrollContainer>
			{posts && posts.map(post => {
				const postItem = post.postInfo;
				let id: string | null = null;
				let title: string | null = null;
				let desc: string | null = null;
				let thumbnail: string[] | [] = [];
				let price: string | null = null;
				let date: string | null = null;
				let user: { userId: string; thumbnail: string } | null = null;
				
				if (postItem.__typename === "SnsPost") {
					id = postItem.postId;
					title = postItem.title;
					desc = postItem.contents;
					thumbnail = postItem.files.map(f => f.url);
					price = null;
					date = postItem.day;
					user = {
						userId: postItem.author.userId,
						thumbnail: postItem.author.profile,
					};
				} else if (postItem.__typename === "BoardingPost") {
					id = postItem.room.roomId;
					title = postItem.room.name;
					desc = postItem.room.description || null;
					thumbnail = postItem.room.boardingRoomFile.map(f => f.url);
					price = postItem.room.monthlyRent?.toLocaleString() || null;
					date = postItem.room.day || null;
					user = {
						userId: postItem.room.boardingHouse.host.user.userId,
						thumbnail: postItem.room.boardingHouse.host.user.profile,
					};
				}
				
				const postData = {
					id,
					title,
					desc,
					thumbnail,
					price,
					date,
					user,
				};
				let currentIndex = null
				if (postData.id) {
					currentIndex = imageIndexMap[Number(postData.id)];
				}
				
				return (
					<S.Post
						key={postData.id}
					>
						<S.PostTitle>
							<S.Profile onClick={(e) => e.stopPropagation()}>
								<S.Thumbnail>
									<Image
										src={postData.user?.thumbnail ? postData.user.thumbnail : "/post/default.png"}
										alt={"user thumbnail"}
										fill
										style={{objectFit: "cover"}}
									/>
								</S.Thumbnail>
								<S.User>
									<p>{postData.user?.userId}</p>
									<p>{postData.desc}</p>
								</S.User>
							</S.Profile>
							<S.Nav onClick={(e) => e.stopPropagation()}>
								<p>{postData.price ? "하숙집" : ""}</p>
								<Square text={"채팅"} onClick={() => {
								}} status={true} width={"100px"}/>
							</S.Nav>
						</S.PostTitle>
						<S.PostImg
							onClick={(e) => e.stopPropagation()}
							onMouseEnter={() => {
								if (postData.id !== null) handleMouseEnter(Number(postData.id));
							}}
							onMouseLeave={handleMouseLeave}
						>
							{/* Left Arrow: index > 0일 때만 */}
							{currentIndex && currentIndex > 0 && (
								<S.Arrow
									isHover={hoverIndex === postData.id}
									status={false}
									onClick={() => {
										if (postData.id !== null) {
											handleSlide(Number(postData.id), "prev");
										}
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{objectFit: "cover"}}/>
								</S.Arrow>
							)}
							
							{/* Slide 이미지 */}
							<S.SliderWrapper>
								<S.SliderTrack index={currentIndex ?? 0}>
									{postData?.thumbnail.map((src, i) => (
										<S.Slide key={i}>
											<Image
												src={src ? src : "/post/default.png"}
												alt={`slide-${i}`}
												fill
												style={{objectFit: "cover"}}
											/>
										</S.Slide>
									))}
								</S.SliderTrack>
							</S.SliderWrapper>
							
							{/* Right Arrow: index < 마지막일 때만 */}
							{currentIndex && currentIndex < postData.thumbnail.length - 1 && (
								<S.Arrow
									isHover={hoverIndex === postData.id}
									status={true}
									onClick={() => {
										if (postData.id !== null) {
											handleSlide(Number(postData.id), "next");
										}
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{objectFit: "cover"}}/>
								</S.Arrow>
							)}
						</S.PostImg>
						<S.Info onClick={() => navigateClick(`/post/${postData.id}`)}>
							<S.PostInfo>
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
								{postData.price && <p>₩ 월 / {postData.price}</p>}
							</S.PostInfo>
							<S.PostName>{postData.title}</S.PostName>
							<S.PostDesc>{postData.desc}</S.PostDesc>
						</S.Info>
					</S.Post>
				)
			})}
		</S.PostScrollContainer>
	);
}