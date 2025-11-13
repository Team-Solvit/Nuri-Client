"use client"

import * as S from "./style"
import Image from "next/image";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Search from "@/assets/icon/search.svg"
import {useParams, useRouter, usePathname} from "next/navigation";
import NProgress from "nprogress";
import Plus from "@/assets/icon/plus.svg"
import AdditionRoom from "@/containers/message/additionRoom/ui";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import { RoomReadResponseDto} from "@/types/message";
import {useMessageDmManageStore} from "@/store/messageDmManage";
import {useMessageHeaderStore} from "@/store/messageHeader";
import {imageCheck} from "@/utils/imageCheck";
import {useAlertStore} from "@/store/alert";
import {messageRequestCheck} from "@/utils/messageRequestCheck";
import { useMessagePageStore } from "@/store/messagePage";
import {useMessageReflectStore} from "@/store/messageReflect";
import useDebounce from "@/hooks/useDebounce";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function MessageSideBar() {
	const size = 10;
	const page = useMessagePageStore((s) => s.page);
	const setPage = useMessagePageStore((s) => s.setPage);
	const roomDataList = useMessagePageStore((s) => s.roomDataList);
	const setRoomDataList = useMessagePageStore((s) => s.setRoomDataList);
	const pathname = usePathname();

	const { data, fetchMore, refetch } = useQuery(MessageQueries.GET_ROOMS_CHAT_LIST, {
		variables: { page, size },
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});
	
	const { message } = useMessageReflectStore()
	
	// URL이 변경될 때마다 메시지 목록 refetch
	const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    refetch();
  }, [pathname, refetch]);

	useEffect(() => {
		if (message) {
			refetch();
		}
	}, [message?.contents, refetch]);
	
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length < size) {
			setIsDone(true);
		}
	}, [data?.getRooms]);
	
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	
	const router = useRouter();
	const {setValues: setHeader} = useMessageHeaderStore()
	const handleRouter = (id: string, name: string, profile: string, memberCount : number) => {
		const raw = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : null;
		const current = raw ? decodeURIComponent(raw) : null;
		if (current === id) return;
		setHeader({
			chatProfile: profile,
			chatRoomName: name,
			memberCount:memberCount
		})
		NProgress.start()
		router.push(`/message/${id}`, {scroll: false});
	}
	const params = useParams();
	const [isAddition, setIsAddition] = useState(false);
	const [isDone, setIsDone] = useState(false);
	
	const {error} = useAlertStore()
	const loadMore = async () => {
		console.log("Loading more rooms, page:", page + 1);
		if (isFetchingMore || isDone || isLoadingMore.current) {
			console.log("loadMore blocked:", { isFetchingMore, isDone, isLoadingMore: isLoadingMore.current });
			return;
		}
		
		isLoadingMore.current = true; // 중복 요청 방지 플래그 설정
		setIsFetchingMore(true);
		try {
			const newPage = page + 1;
			const res = await fetchMore({
				variables: { 
					page: newPage,
					size,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult || fetchMoreResult?.getRooms?.length === 0) {
						setIsDone(true);
						return prev;
					}
					
					// 가져온 데이터가 size보다 작으면 더 이상 없음
					if (fetchMoreResult.getRooms.length < size) {
						setIsDone(true);
					}
					
					// 전역 상태에 페이지 업데이트
					setPage(newPage);
					return {
						...prev,
						getRooms: [...(prev?.getRooms || []), ...(fetchMoreResult?.getRooms || [])],
					};
				},
			});
			
			if (!res.data || res.data?.getRooms?.length === 0) {
				setIsDone(true);
				error("더 이상 불러올 채팅방이 없습니다");
			} else if (res.data.getRooms.length < size) {
				setIsDone(true);
			}
		} catch (e) {
			console.error("Failed to load more rooms:", e);
		} finally {
			setIsFetchingMore(false);
			isLoadingMore.current = false; // 플래그 해제
		}
	};
	const iconRef = useRef<HTMLImageElement>(null);
	const isLoadingMore = useRef(false); // 중복 요청 방지
	
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
		if ( isFetchingMore || isLoadingMore.current) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoadingMore.current) {
					loadMore();
				}
			},
			{ root: null, rootMargin: "300px 0px", threshold: 0 }
		);
		if (node) observer.current.observe(node);
	}, [ isFetchingMore, loadMore]);
	const {chatRoomId, chatRoomName, chatProfile, isOpen, setValues: setDmRoom} = useMessageDmManageStore();
	
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length > 0) {
			const merged = [...roomDataList, ...data.getRooms];
			
			const unique = merged.reduceRight((acc, cur) => {
				if (cur.roomDto && !acc.some((r: RoomReadResponseDto) => r.roomDto?.id === cur.roomDto?.id)) {
					acc.push(cur);
				}
				return acc;
			}, [] as typeof merged);
			
			setRoomDataList(unique.reverse());
		}
	}, [data?.getRooms]);
	
	useEffect(() => {
		if (isOpen && chatRoomId) {
			const roomExists = roomDataList.some(room => room.roomDto?.id === chatRoomId);
			const next = roomExists
				? roomDataList
				: [
					{
						latestMessage: "",
						latestCreatedAt: "",
						roomDto: {
							name: chatRoomName,
							id: chatRoomId,
							profile: chatProfile,
							memberCount : 0
						},
					},
					...roomDataList,
				];
			const unique = next.reduceRight((acc, cur) => {
				if (cur.roomDto && !acc.some(r => {
					return r.roomDto?.id === cur.roomDto?.id
				})) {
					acc.push(cur);
				}
				return acc;
			}, [] as typeof next);
			setRoomDataList(unique.reverse());
			
			setDmRoom({
				isOpen: false,
				chatRoomId: "",
				chatProfile: "",
				chatRoomName: "",
			});
		}
	}, [isOpen, chatRoomId, chatRoomName, chatProfile]);
	
	const changeParamsId = (id: string | null | undefined) => {
		if (!id) return "";
		let decoded = id;
		try {
			decoded = decodeURIComponent(id);
		} catch { /* ignore malformed percent-encoding */ }
		const idx = decoded.lastIndexOf(":");
		return idx !== -1 ? decoded.substring(idx + 1) : decoded;
	};

	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms 디바운스
	const [searchResults, setSearchResults] = useState<RoomReadResponseDto[] | null>(null);

	useEffect(() => {
		const q = debouncedSearchTerm.trim().toLowerCase();
		if (!q) {
			setSearchResults(null);
			return;
		}
		const results = (roomDataList || []).filter((room) => {
			const name = (room.roomDto?.name || "").toLowerCase();
			const latest = (room.latestMessage || "").toLowerCase();
			return name.includes(q) || latest.includes(q);
		});
		setSearchResults(results);
	}, [debouncedSearchTerm, roomDataList]);


	const navigate = useNavigationWithProgress()
	return (
		<S.MessageContainer id={typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''}>
			<S.Header>
				<S.BackButton onClick={() => navigate('/')}>
					<Image src={"/icons/arrow.svg"} style={{transform: "rotate(180deg)"}} alt="back" width={24} height={24} />
				</S.BackButton>
				<S.AddRoom>
					방추가
					<Image
						ref={iconRef}
						onClick={(e) => {
							e.stopPropagation();
							setIsAddition(!isAddition);
						}} src={Plus} alt={"plus-icon"} width={24} height={24}/>
					<AdditionRoom
						isAddition={isAddition}
						setIsAddition={setIsAddition}
						iconRef={iconRef as React.RefObject<HTMLImageElement>}
						type={"add"}
					/>
				</S.AddRoom>
			</S.Header>
			<S.Search>
				<input
					type={"text"}
					placeholder={"채팅방 이름 또는 메시지로 검색하세요"}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Image
					src={Search}
					alt={"search-icon"}
					width={16}
					height={16}
				/>
			</S.Search>
			<S.CategoryList
			>
				{(() => {
					const displayList = (searchResults ?? roomDataList)?.filter(room => room?.roomDto && room.roomDto.id) ?? [];
					
					return displayList.map((room, index) => {
						if (!room?.roomDto?.id) return null;
						
						const { id, name, profile, memberCount } = room.roomDto;
						const isActive = decodeURIComponent(params.id as string) === id || changeParamsId(params.id as string) === id;
						
						// 최신 메시지 처리 함수
						const getLatestMessageDisplay = (message: string) => {
							// 이미지 메시지 체크
							if (IMAGE_BASE && message?.startsWith(IMAGE_BASE)) {
								return "이미지";
							}
							if (typeof message === "string" && /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(message)) {
								return "이미지";
							}
							
							// 계약 메시지 체크
							const request = messageRequestCheck(message || "")
							if (request?.type === "contract") {
								return "계약";
							}
							if(request?.type === "roomTour"){
								return "룸투어"
							}
							
							// 입장 메시지 처리 ([id1, id2] join)
							const joinMatch = message?.match(/\[([^\]]+)\]\s*join/i);
							if (joinMatch) {
								const joinedUsers = joinMatch[1].split(',').map(user => user.trim());
								if (joinedUsers.length === 1) {
									return `${joinedUsers[0]}님이 들어왔습니다`;
								} else {
									return `${joinedUsers.join(', ')}님이 들어왔습니다`;
								}
							}
							
							// 퇴장 메시지 처리 (id1 exit)
							const exitMatch = message?.match(/^(\w+)\s+exit$/);
							if (exitMatch) {
								const exitedUser = exitMatch[1];
								return `${exitedUser}님이 나갔습니다`;
							}
							
							// 일반 메시지
							return message;
						};
						
						return (
							<S.ChatBox
								/* 검색 중일 때는 무한스크롤(마지막 요소 관찰)을 비활성화 */
								ref={(!searchResults && displayList) && index === displayList.length - 1 ? lastPostElementRef : undefined}
								key={id}
								onClick={() => handleRouter(id, name, profile ?? "", memberCount)}
								isRead={isActive}
							>
								<S.Profile>
									<Image src={imageCheck(profile || "")} alt={"profile"} fill/>
								</S.Profile>
								<S.Info hasUnread={!!room?.newMessageCount}>
									<h4>
										{name}
									</h4>
									<p>{getLatestMessageDisplay(room?.latestMessage ?? "")}</p>
								</S.Info>
								{/* 읽지 않은 메시지가 있을 때만 빨간 동그라미 표시 */}
								{Number(room?.newMessageCount) > 0 && !isActive && (
									<S.UnreadBadge />
								)}
							</S.ChatBox>
						)
					});
				})()}
				{/* 검색 결과가 없을 때 메시지 표시 */}
				{searchResults && searchResults.length === 0 && <S.NoText>검색 결과가 없습니다</S.NoText>}
				{isDone && !searchResults && roomDataList?.length === 0 && <S.NoText>채팅방이 없습니다</S.NoText>}
			</S.CategoryList>
		</S.MessageContainer>
	)
}

