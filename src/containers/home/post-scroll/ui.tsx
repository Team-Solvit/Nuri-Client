"use client";

import * as S from "./style";
import {fakeData} from "@/containers/home/post-scroll/data";
import Image from "next/image";
import Square from "@/components/ui/button/square";
import Heart from "@/assets/post/heart.svg";
import Comment from "@/assets/post/comment.svg";
import Arrow from "@/assets/post/arrow-right.svg";
import {useState, useRef, useCallback} from "react";
import {useRouter} from "next/navigation";
import {useQuery} from "@apollo/client";
import {PostQueries} from "@/services/post";
import type {GetPostListResponse, GetPostListVariables} from "@/types/post";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useAlertStore} from "@/store/alert";

export default function PostScroll() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const navigate = useRouter();
	const navigateClick = (path: string) => {
		navigate.push(path);
	}
	const [imageIndexMap, setImageIndexMap] = useState<Record<number, number>>({});
	const [isFetchingMore, setIsFetchingMore] = useState(false);

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
	
	const [page, setPage] = useState(0);
	const [isDone, setIsDone] = useState(false);
	const { data: postData, loading, fetchMore } = useQuery<GetPostListResponse, GetPostListVariables>(
		PostQueries.GET_POST_LIST,
		{
			variables: { start: 0 },
			notifyOnNetworkStatusChange: true
		}
	);
	useLoadingEffect(loading)
	const posts = postData?.getPostList;
	const { error } = useAlertStore();
	
	const loadMore = async () => {
		if (isFetchingMore || isDone) return;
		if (!postData?.getPostList || postData.getPostList.length === 0) return;
		
		setIsFetchingMore(true);
		const newPage = page + 1;
		setPage(newPage);
		
		try {
			await fetchMore({
				variables: { start: newPage },
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult || fetchMoreResult.getPostList.length === 0) {
						error("더 이상 불러올 게시물이 없습니다");
						setIsDone(true)
						return prev; // 기존 데이터 그대로 유지
					}
					
					return {
						...prev,
						getPostList: [
							...(prev.getPostList ?? []), // 기존 데이터
							...fetchMoreResult.getPostList, // 새로 가져온 데이터
						],
					};
				},
			});
		} finally {
			setIsFetchingMore(false);
		}
	};

	// IntersectionObserver to detect when the last post is visible
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
		if (loading || isFetchingMore) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				loadMore();
			}
		});
		if (node) observer.current.observe(node);
	}, [loading, isFetchingMore, posts?.length]);

	return (
		<S.PostScrollContainer>
			{posts && posts.map((post, index) => {
				const postItem = post.postInfo;
				let id: string | null = null;
				let title: string | null = null;
				let desc: string | null = null;
				let thumbnail: string[] | [] = [];
				let price: string | null = null;
				let date: string | null = null;
				let user: { userId: string; thumbnail: string } | null = null;
				let commentCount : number | null = null;
				let likeCount : number | null = null;

				if (postItem.__typename === "SnsPost") {
					id = postItem.postId;
					title = postItem.title;
					desc = postItem.contents;
					commentCount = postItem.commentCount;
					likeCount = postItem.likeCount;
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
					commentCount = postItem.commentCount;
					likeCount = postItem.likeCount;
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
					commentCount,
					likeCount
				};
				let currentIndex = null
				if (postData.id) {
					currentIndex = imageIndexMap[Number(postData.id)];
				}

				const profileSrc: string =
					!user?.thumbnail
						? "/post/default.png"
						: /^https:\/\//.test(user?.thumbnail)
							? user?.thumbnail
							: process.env.NEXT_PUBLIC_IMAGE_URL + user?.thumbnail;

				return (
					<S.Post
						key={postData.id}
						ref={posts && index === posts.length - 1 ? lastPostElementRef : undefined}
					>
						<S.PostTitle>
							<S.Profile onClick={(e) => e.stopPropagation()}>
								<S.Thumbnail>
									<Image
										src={profileSrc}
										alt={"user thumbnail"}
										fill
										style={{objectFit: "cover"}}
									/>
								</S.Thumbnail>
								<S.User>
									<p>{postData.user?.userId}</p>
									<p>{postData.date}</p>
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
												src={src ? process.env.NEXT_PUBLIC_IMAGE_URL + src : "/post/default.png"}
												alt={`slide-${i}`}
												fill
												style={{objectFit: "contain"}}
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
										<p>{postData.likeCount}</p>
									</S.Inter>
									<S.Inter>
										<Image src={Comment} alt="comment" width={24} height={24}/>
										<p>{postData.commentCount}</p>
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