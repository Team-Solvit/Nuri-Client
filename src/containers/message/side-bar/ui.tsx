"use client"

import * as S from "./style"
import Image from "next/image";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Search from "@/assets/icon/search.svg"
import {useParams, useRouter} from "next/navigation";
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
import {useLoadingEffect} from "@/hooks/useLoading";
import {messageRequestCheck} from "@/utils/messageRequestCheck";
import { useMessagePageStore } from "@/store/messagePage";
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function MessageSideBar() {
	const size = 10;
	const page = useMessagePageStore((s) => s.page);
	const setPage = useMessagePageStore((s) => s.setPage);
	const roomDataList = useMessagePageStore((s) => s.roomDataList);
	const setRoomDataList = useMessagePageStore((s) => s.setRoomDataList);

	const { data, loading, fetchMore } = useQuery(MessageQueries.GET_ROOMS_CHAT_LIST, {
		variables: { page, size },
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
	});
	
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length < size) {
			setIsDone(true);
		}
	}, [data?.getRooms]);
	
	useLoadingEffect(loading)
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	
	const router = useRouter();
	const {setValues: setHeader} = useMessageHeaderStore()
	const handleRouter = (id: string, name: string, profile: string, memberCount : number) => {
		if (decodeURIComponent(params.id as string) === id) return;
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
		if (isFetchingMore || isDone) return;
		if (!data?.getRooms || data?.getRooms?.length === 0) {
			setIsDone(true);
			return;
		}
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
					// 전역 상태에 페이지 업데이트
					setPage(newPage);
					return {
						...prev,
						getRooms: [...(prev?.getRooms ?? []), ...fetchMoreResult?.getRooms],
					};
				},
			});
			if (!res.data || res.data?.getRooms?.length === 0) {
				setIsDone(true);
				error("더 이상 불러올 채팅방이 없습니다");
			}
		} finally {
			setIsFetchingMore(false);
		}
	};
	const iconRef = useRef<HTMLImageElement>(null);
	
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
	}, [loading, isFetchingMore, roomDataList?.length]);
	const {chatRoomId, chatRoomName, chatProfile, isOpen, setValues: setDmRoom} = useMessageDmManageStore();
	
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length > 0) {
			const merged = [...roomDataList, ...data.getRooms];
			
			const unique = merged.reduceRight((acc, cur) => {
				if (!acc.some((r : RoomReadResponseDto) => r.roomDto.name === cur.roomDto.name)) {
					acc.push(cur);
				}
				return acc;
			}, [] as typeof merged);
			
			setRoomDataList(unique.reverse());
		}
	}, [data?.getRooms]);
	
	useEffect(() => {
		if (isOpen && chatRoomId) {
			const roomExists = roomDataList.some(room => room.roomDto.id === chatRoomId);
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
				if (!acc.some(r => r.roomDto.name === cur.roomDto.name)) {
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
	}, [isOpen, chatRoomId]);
	
	const changeParamsId = (id: string) => {
		const decoded = decodeURIComponent(id);
		const idx = decoded.lastIndexOf(":");
		return idx !== -1 ? decoded.substring(idx + 1) : decoded;
	};

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<RoomReadResponseDto[] | null>(null);

	const performSearch = () => {
		const q = searchTerm.trim().toLowerCase();
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
	};

	return (
		<S.MessageContainer id={typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''}>
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
			<S.Search>
				<input
					type={"text"}
					placeholder={"채팅방 이름 또는 메시지로 검색하세요"}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Enter") {
							performSearch();
						}
					}}
				/>
				<Image
					src={Search}
					alt={"search-icon"}
					width={16}
					height={16}
					onClick={() => performSearch()}
				/>
			</S.Search>
			<S.CategoryList
			>
				{(searchResults ?? roomDataList) && (searchResults ?? roomDataList)!.map((room, index) => {
					const isActive = decodeURIComponent(params.id as string) === room.roomDto.id || changeParamsId(params.id as string) === room.roomDto.id;
					return (
						<S.ChatBox
							/* 검색 중일 때는 무한스크롤(마지막 요소 관찰)을 비활성화 */
							ref={(!searchResults && roomDataList) && index === roomDataList.length - 1 ? lastPostElementRef : undefined}
							key={room.roomDto.id}
							onClick={() => handleRouter(room.roomDto.id, room.roomDto.name, room.roomDto.profile ?? "", room.roomDto.memberCount)}
							isRead={isActive}
						>
							<S.Profile>
								<Image src={imageCheck(room?.roomDto?.profile || "")} alt={"profile"} fill/>
							</S.Profile>
							<S.Info>
								<h4>
									{room.roomDto.name}
								</h4>
								<p>{room.latestMessage?.startsWith(IMAGE_BASE || "") ? "이미지" : messageRequestCheck(room?.latestMessage || "") ? "계약" : room.latestMessage}</p>
							</S.Info>
						</S.ChatBox>
					)
				})}
				{/* 검색 결과가 없을 때 메시지 표시 */}
				{searchResults && searchResults.length === 0 && <p>검색 결과가 없습니다</p>}
				{isDone && !searchResults && roomDataList?.length === 0 && <p>채팅방이 없습니다</p>}
			</S.CategoryList>
		</S.MessageContainer>
	)
}