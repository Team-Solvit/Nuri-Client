"use client";

import * as S from "./style";
import Image from "next/image";
import Square from "@/components/ui/button/square";
import Heart from "@/assets/post/heart.svg";
import Comment from "@/assets/post/comment.svg";
import Arrow from "@/assets/post/arrow-right.svg";
import {useState, useRef, useCallback} from "react";
import {useQuery, useMutation} from "@apollo/client";
import {PostQueries} from "@/services/post";
import type {GetPostListResponse, GetPostListVariables} from "@/types/post";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useAlertStore} from "@/store/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import PostScrollSkeleton from "@/components/ui/skeleton/PostScrollSkeleton";

import {usePermissionGuard} from "@/hooks/usePermissionGuard";
import { useMoveChatRoom } from "@/hooks/useMoveChatRoom";
import { useUserStore } from "@/store/user";
import { PostDetailGQL } from "@/services/postDetail";


export default function PostScroll() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const navigate = useNavigationWithProgress();
	const navigateClick = (path: string) => navigate(path);
	const [imageIndexMap, setImageIndexMap] = useState<Record<number, number>>({});
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	
	const [page, setPage] = useState(0);
	const { data: postData, loading, fetchMore } = useQuery<GetPostListResponse, GetPostListVariables>(
		PostQueries.GET_POST_LIST,
		{
			variables: { start: 0 },
			fetchPolicy: "no-cache",
			nextFetchPolicy: "no-cache",
			notifyOnNetworkStatusChange: true,
		}
	);
	
	const isInitialLoading = loading && !postData?.getPostList;
	
	useLoadingEffect(isInitialLoading || isFetchingMore);
	
	const posts = postData?.getPostList;
	const { error, success } = useAlertStore();
  
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
					if (!fetchMoreResult || fetchMoreResult.getPostList.length === 0) return prev;
					return {
						...prev,
						getPostList: [...(prev.getPostList ?? []), ...fetchMoreResult.getPostList],
					};
				},
			});
			const totalCount = res.data?.getPostList?.length
			if(totalCount < 1){
				success("모든 게시물을 불러왔습니다")
				isCompleted.current = true
			}
		} finally {
			setIsFetchingMore(false);
		}
	};
	
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
		if (loading || isFetchingMore) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) loadMore();
			},
			{ root: null, rootMargin: "300px 0px", threshold: 0 }
		);
		if (node) observer.current.observe(node);
	}, [loading, isFetchingMore, posts?.length]);
	
	const { moveChatRoom } = useMoveChatRoom();
	
	const [likePost] = useMutation(PostDetailGQL.MUTATIONS.LIKE_POST, {
		update(cache, { data }) {
			// mutation 성공 시 캐시 업데이트는 자동으로 처리됨
		}
	});
	const [unlikePost] = useMutation(PostDetailGQL.MUTATIONS.UNLIKE_POST, {
		update(cache, { data }) {
			// mutation 성공 시 캐시 업데이트는 자동으로 처리됨
		}
	});
	const [likeRoom] = useMutation(PostDetailGQL.MUTATIONS.LIKE_ROOM, {
		update(cache, { data }) {
			// mutation 성공 시 캐시 업데이트는 자동으로 처리됨
		}
	});
	const [unlikeRoom] = useMutation(PostDetailGQL.MUTATIONS.UNLIKE_ROOM, {
		update(cache, { data }) {
			// mutation 성공 시 캐시 업데이트는 자동으로 처리됨
		}
	});
	
	// 낙관적 UI를 위한 로컬 상태
	const [optimisticLikes, setOptimisticLikes] = useState<Record<string, { isLiked: boolean; likeCount: number }>>({});
	
	const handleLikeToggle = async (postId: string, currentIsLiked: boolean, isRoom: boolean, currentLikeCount: number) => {
		// 낙관적 UI 업데이트
		setOptimisticLikes(prev => ({
			...prev,
			[postId]: {
				isLiked: !currentIsLiked,
				likeCount: currentIsLiked ? currentLikeCount - 1 : currentLikeCount + 1
			}
		}));
		
		try {
			if (isRoom) {
				if (currentIsLiked) {
					await unlikeRoom({ variables: { roomId: postId } });
				} else {
					await likeRoom({ variables: { roomId: postId } });
				}
			} else {
				if (currentIsLiked) {
					await unlikePost({ variables: { postId } });
				} else {
					await likePost({ variables: { postId } });
				}
			}
		} catch (err) {
			console.error('좋아요 처리 실패:', err);
			error('좋아요 처리 중 오류가 발생했습니다.');
			// 실패 시 롤백
			setOptimisticLikes(prev => ({
				...prev,
				[postId]: {
					isLiked: currentIsLiked,
					likeCount: currentLikeCount
				}
			}));
		}
	};
	
	const handleMouseEnter = (id: number) => setHoverIndex(id);
	const handleMouseLeave = () => setHoverIndex(null);
	
	const handleSlide = (postId: number, direction: "next" | "prev") => {
		if (!posts) return;
		setImageIndexMap(prev => {
			const current = prev[postId] || 0;
			const postItem = posts[postId].postInfo;
			const images =
				postItem.__typename === "SnsPost"
					? postItem.files.map(f => f.url)
					: postItem.room.boardingRoomFile.map(f => f.url);
			const max = images.length - 1;
			const next = direction === "next"
				? (current + 1) % (max + 1)
				: (current - 1 + max + 1) % (max + 1);
			return { ...prev, [postId]: next };
		});
	};
	
	const {userId : curruentUserId} = useUserStore()
	const {withPermission} = usePermissionGuard()
	// 초기 로딩 중이면 스켈레톤 컴포넌트 렌더링
	if (isInitialLoading) {
		return <PostScrollSkeleton />;
	}

	return (
		<S.PostScrollContainer>
			{!loading && posts?.length === 0 && <p>생성된 게시물이 없습니다.</p>}
			{posts?.map((post, index) => {
				const postItem = post.postInfo;
				let id: string | null = null;
				let title: string | null = null;
				let desc: string | null = null;
				let thumbnail: string[] | [] = [];
				let price: string | null = null;
				let date: string | null = null;
				let user: { userId: string; thumbnail: string } | null = null;
				let commentCount: number | null = null;
				let likeCount: number | null = null;
				let isLiked: boolean = false;
				let isRoom: boolean = false;
				let roomStatus: 'EMPTY_ROOM' | 'FULL' | 'REMAIN' | null = null;
				
				if (postItem.__typename === "SnsPost") {
					id = postItem.postId;
					title = postItem.title;
					desc = postItem.contents;
					commentCount = postItem.commentCount;
					likeCount = postItem.likeCount;
					isLiked = postItem.isLiked ?? false;
					thumbnail = postItem.files.map(f => f.url);
					price = null;
					date = postItem.day;
					user = { userId: postItem.author.userId, thumbnail: postItem.author.profile ?? "" };
					isRoom = false;
				} else if (postItem.__typename === "BoardingPost") {
					id = postItem.room.roomId;
					title = postItem.room.name;
					commentCount = postItem.room.commentCount;
					likeCount = postItem.room.likeCount;
					isLiked = postItem.room.isLiked ?? false;
					desc = postItem.room.description || null;
					thumbnail = postItem.room.boardingRoomFile.map(f => f.url);
					price = postItem.room.monthlyRent?.toLocaleString() || null;
					date = postItem.room.day || null;
					user = { userId: postItem.room.boardingHouse.host.user.userId, thumbnail: postItem.room.boardingHouse.host.user.profile ?? "" };
					isRoom = true;
					roomStatus = postItem.room.status || null;
				}
				
				// 낙관적 UI 적용
				const optimisticState = id ? optimisticLikes[id] : null;
				const displayIsLiked = optimisticState ? optimisticState.isLiked : isLiked;
				const displayLikeCount = optimisticState ? optimisticState.likeCount : likeCount;
				
				const currentIndex = imageIndexMap[index] || 0;
				const profileSrc = !user?.thumbnail
					? "/post/default.png"
					: /^https?:\/\//.test(user.thumbnail)
						? user.thumbnail
						: `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${user.thumbnail}`;
				
				return (
					<S.Post
						key={id}
						ref={index === posts.length - 1 ? lastPostElementRef : undefined}
					>
						<S.PostTitle>
							<S.Profile onClick={(e) => {
								e.stopPropagation();
								if (user?.userId) {
									navigateClick(`/profile/${user?.userId}`);
								}
							}}>
								<S.Thumbnail>
									<Image src={profileSrc} alt="user thumbnail" fill style={{ objectFit: "cover" }} />
								</S.Thumbnail>
								<S.User>
									<p>{user?.userId}</p>
									<p>{date}</p>
								</S.User>
							</S.Profile>
							<S.Nav onClick={(e) => e.stopPropagation()}>
								<p>{price ? "하숙집" : ""}</p>
								{user?.userId !==  curruentUserId &&<Square
									text="채팅"
									width="100px"
									status
									onClick={() => {
										if (!user) return;
										withPermission(() => moveChatRoom(user));
									}}
								/>}
							</S.Nav>
						</S.PostTitle>
						
						<S.PostImg
              onClick={() => {
								if (id) {
									navigateClick(`/post/${id}`);
								}
							}}
							onMouseEnter={() => {
								handleMouseEnter(index);
							}}
							onMouseLeave={handleMouseLeave}
						>
						{roomStatus && (
						<S.StatusBadge status={roomStatus}>
						{roomStatus === 'EMPTY_ROOM' ? '빈방' : roomStatus === 'FULL' ? '만실' : '잔여'}
						</S.StatusBadge>
						)}
							{currentIndex > 0 && (
								<S.Arrow
									isHover={hoverIndex === index}
									status={false}
									onClick={(e) => {
										e.stopPropagation();
										if (id !== null) {
											handleSlide(index, "prev");
										}
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover" }} />
								</S.Arrow>
							)}
							
							<S.SliderWrapper>
								<S.SliderTrack index={currentIndex}>
									{thumbnail.map((src, i) => (
										<S.Slide key={i}>
											<Image
												src={/^https?:\/\//.test(src) ? src : `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${src}`}
												alt={`slide-${i}`}
												fill
												style={{ objectFit: "cover" }}
											/>
										</S.Slide>
									))}
								</S.SliderTrack>
							</S.SliderWrapper>
							
							{currentIndex < thumbnail.length - 1 && (
								<S.Arrow
									isHover={hoverIndex === index}
									status={true}
									onClick={(e) => {
										e.stopPropagation();
										if (id !== null) {
											handleSlide(index, "next");
										}
									}}
								>
									<Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover" }} />
								</S.Arrow>
							)}
						</S.PostImg>
						
						<S.Info onClick={() => navigateClick(`/post/${id}`)}>
							<S.PostInfo>
								<S.Interactive>
									<S.Inter
										onClick={(e) => {
											e.stopPropagation();
											if (id && likeCount !== null) {
												withPermission(() => handleLikeToggle(id, displayIsLiked, isRoom, displayLikeCount ?? 0));
											}
										}}
										style={{ 
											cursor: 'pointer',
											transition: 'transform 0.2s ease',
										}}
										onMouseDown={(e) => {
											(e.currentTarget as HTMLElement).style.transform = 'scale(0.9)';
										}}
										onMouseUp={(e) => {
											(e.currentTarget as HTMLElement).style.transform = 'scale(1)';
										}}
										onMouseLeave={(e) => {
											(e.currentTarget as HTMLElement).style.transform = 'scale(1)';
										}}
									>
										<Image 
											src={Heart} 
											alt="like" 
											width={28} 
											height={28}
											style={{ 
												filter: displayIsLiked 
													? 'invert(27%) sepia(91%) saturate(6490%) hue-rotate(343deg) brightness(98%) contrast(94%)' 
													: 'none',
												transition: 'filter 0.3s ease, transform 0.3s ease',
												transform: displayIsLiked ? 'scale(1.1)' : 'scale(1)',
											}}
										/>
										<p style={{ transition: 'color 0.3s ease', color: displayIsLiked ? '#ff385c' : 'inherit' }}>
											{displayLikeCount}
										</p>
									</S.Inter>
									<S.Inter>
										<Image src={Comment} alt="comment" width={24} height={24} />
										<p>{commentCount}</p>
									</S.Inter>
								</S.Interactive>
								{price && <p>₩ 월 / {price}</p>}
							</S.PostInfo>
							<S.PostName>{title}</S.PostName>
							<S.PostDesc>{desc && desc.length > 200 ? `${desc.slice(0, 200)}...` : desc}</S.PostDesc>
						</S.Info>
					</S.Post>
				);
			})}
		</S.PostScrollContainer>
	);
}