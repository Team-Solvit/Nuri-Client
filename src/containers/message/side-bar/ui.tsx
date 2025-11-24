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
		variables: { page: 0, size },
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});
	
	const { message } = useMessageReflectStore()
	
	// URL이 변경될 때마다 메시지 목록 refetch
	const prevPathRef = useRef<string | null>(null);

	useEffect(() => {
		if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
			refetch();
		}
		prevPathRef.current = pathname;
	}, [pathname, refetch]);

	useEffect(() => {
		if (message) {
			refetch();
		}
	}, [message?.contents, refetch]);
	
	useEffect(() => {
		if (data?.getRooms) {
			// 데이터가 size보다 작으면 더 이상 불러올 데이터 없음
			if (data.getRooms.length < size) {
				setIsDone(true);
			} else if (page > 0 && data.getRooms.length >= size) {
				setIsDone(false);
			}
		}
	}, [data?.getRooms, page]);
	
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
			memberCount:memberCount,
			roomId: id
		})
		NProgress.start()
		router.push(`/message/${id}`, {scroll: false});
	}
	const params = useParams();
	const [isAddition, setIsAddition] = useState(false);
	const [isDone, setIsDone] = useState(false);
	
	const {success} = useAlertStore()
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
					
					// 중복 제거하면서 병합
					const existingIds = new Set((prev?.getRooms || []).map((r: RoomReadResponseDto) => r.roomDto?.id));
					const newRooms = (fetchMoreResult?.getRooms || []).filter(
						(r: RoomReadResponseDto) => r.roomDto?.id && !existingIds.has(r.roomDto.id)
					);
					
					const merged = [...(prev?.getRooms || []), ...newRooms];
					
					// 전역 상태 업데이트
					setRoomDataList(merged);
					
					return {
						...prev,
						getRooms: merged,
					};
				},
			});
			
			if (!res.data || res.data?.getRooms?.length === 0) {
				setIsDone(true);
				success("모든 채팅방을 불러왔습니다");
			} else if (res.data.getRooms.length < size) {
				setIsDone(true);
				success("모든 채팅방을 불러왔습니다");
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
	
	// 초기 로드 및 refetch 시에만 데이터 설정 (중복 제거)
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length > 0) {
			// page가 0이면 초기 로드이므로 덮어쓰기
			if (page === 0) {
				setRoomDataList(data.getRooms);
			} else {
				// fetchMore의 경우 updateQuery에서 이미 처리되므로 여기서는 스킵
				return;
			}
		}
	}, [data?.getRooms, page, setRoomDataList]);
	
	useEffect(() => {
		if (isOpen && chatRoomId) {
			const roomExists = roomDataList.some(room => room.roomDto?.id === chatRoomId);
			if (!roomExists) {
				const newRoom = {
					latestMessage: "",
					latestCreatedAt: "",
					roomDto: {
						name: chatRoomName,
						id: chatRoomId,
						profile: chatProfile,
						memberCount: 0
					},
				};
				setRoomDataList([newRoom, ...roomDataList]);
			}
			
			setDmRoom({
				isOpen: false,
				chatRoomId: "",
				chatProfile: "",
				chatRoomName: "",
			});
		}
	}, [isOpen, chatRoomId]);
	
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
					placeholder={"채팅방 이름을 입력해주세요"}
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

