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
import {contractCheck} from "@/utils/contractCheck";
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function MessageSideBar() {
	const size = 10;
	const [page, setPage] = useState(0);
	
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
	const [roomDataList, setRoomDataList] = useState<RoomReadResponseDto[]>(data?.getRooms || []);
	
	const router = useRouter();
	const {setValues: setHeader} = useMessageHeaderStore()
	const handleRouter = (id: string, name: string, profile: string) => {
		if (decodeURIComponent(params.id as string) === id) return;
		setHeader({
			chatProfile: profile,
			chatRoomName: name,
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
			setRoomDataList((prev) => {
				const merged = [...prev, ...data.getRooms];
				
				const unique = merged.reduceRight((acc, cur) => {
					if (!acc.some((r : RoomReadResponseDto) => r.roomDto.name === cur.roomDto.name)) {
						acc.push(cur);
					}
					return acc;
				}, [] as typeof merged);
				
				return unique.reverse();
			});
		}
	}, [data?.getRooms]);
	
	useEffect(() => {
		if (isOpen && chatRoomId) {
			setRoomDataList((prev) => {
				const roomExists = prev.some(room => room.roomDto.id === chatRoomId);
				const next = roomExists
					? prev
					: [
						{
							latestMessage: "",
							latestCreatedAt: "",
							roomDto: {
								name: chatRoomName,
								id: chatRoomId,
								profile: chatProfile,
							},
						},
						...prev,
					];
				const unique = next.reduceRight((acc, cur) => {
					if (!acc.some(r => r.roomDto.name === cur.roomDto.name)) {
						acc.push(cur);
					}
					return acc;
				}, [] as typeof next);
				
				return unique.reverse();
			});
			
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
				<input type={"text"} placeholder={"채팅방을 입력하세요"}/>
				<Image src={Search} alt={"search-icon"} width={16} height={16}/>
			</S.Search>
			<S.CategoryList
			>
				{roomDataList && roomDataList?.map((room, index) => {
					return (
						<S.ChatBox
							ref={roomDataList && index === roomDataList.length - 1 ? lastPostElementRef : undefined}
							key={room.roomDto.id}
							onClick={() => handleRouter(room.roomDto.id, room.roomDto.name, room.roomDto.profile ?? "")}
							isRead={decodeURIComponent(params.id as string) === room.roomDto.id || changeParamsId(params.id as string) === room.roomDto.id}
						>
							<S.Profile>
								<Image src={imageCheck(room?.roomDto?.profile || "")} alt={"profile"} fill/>
							</S.Profile>
							<S.Info>
								<h4>{room.roomDto.name}</h4>
								<p>{room.latestMessage?.startsWith(IMAGE_BASE || "") ? "이미지" : contractCheck(room.latestMessage) ? "계약" : room.latestMessage}</p>
							</S.Info>
						</S.ChatBox>
					)
				})}
			</S.CategoryList>
		</S.MessageContainer>
	)
}