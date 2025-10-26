"use client";

import * as S from "./style";
import Image from "next/image";
import Square from "@/components/ui/button/square";
import Heart from "@/assets/post/heart.svg";
import Comment from "@/assets/post/comment.svg";
import Arrow from "@/assets/post/arrow-right.svg";
import {useState, useRef, useCallback} from "react";
import {useQuery} from "@apollo/client";
import {PostQueries} from "@/services/post";
import type {GetPostListResponse, GetPostListVariables} from "@/types/post";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useAlertStore} from "@/store/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useUserStore} from "@/store/user";
import PostScrollSkeleton from "@/components/ui/skeleton/PostScrollSkeleton";
import {usePermissionGuard} from "@/hooks/usePermissionGuard";

export default function PostScroll() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const navigate = useNavigationWithProgress();
	const navigateClick = (path: string) => {
		navigate(path);
	}
	const [imageIndexMap, setImageIndexMap] = useState<Record<number, number>>({});
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	
	
	const [page, setPage] = useState(0);
	const { data: postData, loading, fetchMore } = useQuery<GetPostListResponse, GetPostListVariables>(
		PostQueries.GET_POST_LIST,
		{
			variables: { start: 0 },
			notifyOnNetworkStatusChange: true
		}
	);
	
	// 초기 로딩만 체크 (loadMore 시에는 스켈레톤 안보여주기)
	const isInitialLoading = loading && !postData?.getPostList;
	
	useLoadingEffect(isInitialLoading || isFetchingMore);
	
	
	const posts = postData?.getPostList;
	const { error } = useAlertStore();
	
	const isCompleted= useRef<boolean>(false)
	const loadMore = async () => {
		if (isFetchingMore || isCompleted.current) return;
		if (!postData?.getPostList) return;
		if(postData?.getPostList.length < 3) return;
		setIsFetchingMore(true);
		const newPage = page + 1;
		setPage(newPage);
		try {
			const res = await fetchMore({
				variables: { start: newPage },
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult || fetchMoreResult.getPostList.length === 0) {
						return prev;
					}
					
					const merged = {
						...prev,
						getPostList: [
							...(prev.getPostList ?? []),
							...fetchMoreResult.getPostList,
						],
					};
					
					return merged;
				},
			});
			
			const totalCount = res.data?.getPostList?.length
			if(totalCount < 1){
				error("더 이상 게시물이 없습니다")
				isCompleted.current = true
			}
		} finally {
			setIsFetchingMore(false);
		}
	};
	
	// IntersectionObserver to detect when the last post is visible
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
		if (loading || isFetchingMore) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			  (entries) => {
			    if (entries[0].isIntersecting) {
				      loadMore();
				    }
			  },
		  { root: null, rootMargin: "300px 0px", threshold: 0 }
		);
		if (node) observer.current.observe(node);
	}, [loading, isFetchingMore, posts?.length]);
	
	const { userId: currentUserId } = useUserStore();
	function handleChatJoinTwoIds(id1: string, id2: string) {
		  if (!id1 || !id2 || id1 === id2) {
			    error("채팅 대상을 확인해 주세요");
			    return;
			  }
		  const chatId = [id1, id2].sort().join(":");
		  navigateClick(`/chat/${chatId}`);
	}
	const handleMouseEnter = (id: number) => setHoverIndex(id);
	const handleMouseLeave = () => setHoverIndex(null);
	
	const handleSlide = (postId: number, direction: "next" | "prev") => {
		if (!posts) return;
		setImageIndexMap(prev => {
			const current = prev[postId] || 0;
			const postItem = posts[postId].postInfo
			const images =
				posts[postId]
					? postItem.__typename === "SnsPost"
						? postItem.files.map(f => f.url)
						: postItem.room.boardingRoomFile.map(f => f.url)
					: [];
			
			const max = images.length - 1;
			
			const next =
				direction === "next"
					? (current + 1) % (max + 1)
					: (current - 1 + max + 1) % (max + 1);
			
			return {...prev, [postId]: next};
		});
	};
	
	const {withPermission} = usePermissionGuard()
	// 초기 로딩 중이면 스켈레톤 컴포넌트 렌더링
	if (isInitialLoading) {
		return <PostScrollSkeleton />;
	}
	return (
		<S.PostScrollContainer>
			{!loading && posts?.length === 0 && <p>생성된 게시물이 없습니다.</p>}
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
						thumbnail: postItem.author.profile ?? "",
					};
				} else if (postItem.__typename === "BoardingPost") {
					id = postItem.room.roomId;
					title = postItem.room.name;
					commentCount = postItem.room.commentCount;
					likeCount = postItem.room.likeCount;
					desc = postItem.room.description || null;
					thumbnail = postItem.room.boardingRoomFile.map(f => f.url);
					price = postItem.room.monthlyRent?.toLocaleString() || null;
					date = postItem.room.day || null;
					user = {
						userId: postItem.room.boardingHouse.host.user.userId,
						thumbnail: postItem.room.boardingHouse.host.user.profile ?? "",
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
				const currentIndex = imageIndexMap[index] || 0;
				
				const profileSrc: string =
					!user?.thumbnail
					    ? "/post/default.png"
						    : /^https?:\/\//.test(user.thumbnail)
					      ? user.thumbnail
						      : `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.thumbnail}`;

				return (
					<S.Post
						key={postData.id}
						ref={posts && index === posts.length - 1 ? lastPostElementRef : undefined}
					>
						<S.PostTitle>
							<S.Profile onClick={(e) => {
								e.stopPropagation();
								if (postData.user?.userId) {
									navigateClick(`/profile/${postData.user?.userId}`);
								}
							}}>
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
									withPermission(()=>handleChatJoinTwoIds(currentUserId ?? "", postData?.user?.userId ?? ""))
								}} status={true} width={"100px"}/>
							</S.Nav>
						</S.PostTitle>
						<S.PostImg
							onClick={() => {
								if (postData.id) {
									navigateClick(`/post/${postData.id}`);
								}
							}}
							onMouseEnter={() => {
								handleMouseEnter(index);
							}}
							onMouseLeave={handleMouseLeave}
						>
							{/* Left Arrow: index > 0일 때만 */}
							{currentIndex > 0 && (
								<S.Arrow
									isHover={hoverIndex === index}
									status={false}
									onClick={(e) => {
										e.stopPropagation();
										if (postData.id !== null) {
											handleSlide(index, "prev");
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
												src={
													    src
													      ? (/^https?:\/\//.test(src) ? src : `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${src}`)
														      : "/post/default.png"
														  }
												alt={`slide-${i}`}
												fill
												style={{objectFit: "cover"}}
											/>
										</S.Slide>
									))}
								</S.SliderTrack>
							</S.SliderWrapper>
							
							{/* Right Arrow: index < 마지막일 때만 */}
							{currentIndex < postData.thumbnail.length - 1 && (
								<S.Arrow
									isHover={hoverIndex === index}
									status={true}
									onClick={(e) => {
										e.stopPropagation();
										if (postData.id !== null) {
											handleSlide(index, "next");
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