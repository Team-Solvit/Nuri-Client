"use client"

import * as S from "./style"
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import Search from "@/assets/icon/search.svg"
import {useParams, useRouter} from "next/navigation";
import NProgress from "nprogress";
import Plus from "@/assets/icon/plus.svg"
import AdditionRoom from "@/containers/message/additionRoom/ui";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {RoomReadResponseDto} from "@/types/message";
import {useMessageDmManageStore} from "@/store/messageDmManage";
import {useMessageHeaderStore} from "@/store/messageHeader";
import {useMessageAlertStore} from "@/store/messageAlert";
import {imageCheck} from "@/utils/imageCheck";
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function MessageSideBar() {
	const [size, setSize] = useState(10);
	const { content } = useMessageAlertStore();
	const [queryVars, setQueryVars] = useState({ page: 0, size, content });
	
	useEffect(() => {
		setQueryVars({ page: 0, size, content });
	}, [content, size]);
	
	const { data } = useQuery(MessageQueries.GET_ROOMS_CHAT_LIST, {
		variables: queryVars,
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
	});
	const [roomDataList, setRoomDataList] = useState<RoomReadResponseDto[]>(data?.getRooms || []);
	
	const router = useRouter();
	const {setValues: setHeader} = useMessageHeaderStore()
	const handleRouter = (id: string, name: string, profile: string) => {
		setHeader({
			chatProfile: profile,
			chatRoomName: name,
		})
		NProgress.start()
		router.push(`/message/${id}`, {scroll: false});
	}
	const params = useParams();
	const [isAddition, setIsAddition] = useState(false);
	
	const iconRef = useRef<HTMLImageElement>(null);
	
	const targetRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (!targetRef.current) return;
		const container = targetRef.current.parentElement; // 실제 스크롤 되는 요소
		
		const handleScroll = () => {
			if (!container) return;
			
			const {scrollTop, scrollHeight, clientHeight} = container;
			if (scrollTop + clientHeight >= scrollHeight - 50) {
				setSize((prev) => prev + 1);
			}
		};
		
		container?.addEventListener("scroll", handleScroll);
		return () => container?.removeEventListener("scroll", handleScroll);
	}, []);
	
	const {chatRoomId, chatRoomName, chatProfile, isOpen, setValues: setDmRoom} = useMessageDmManageStore();
	
	useEffect(() => {
		if (data?.getRooms) {
			setRoomDataList(data.getRooms);
		}
	}, []);
	
	useEffect(() => {
		if (data?.getRooms && data.getRooms.length > 0) {
			setRoomDataList(data.getRooms);
		}
	}, [data?.getRooms]);
	
	useEffect(() => {
		if (isOpen && chatRoomId) {
			setRoomDataList((prev) => {
				const roomExists = prev.some(room => room.roomDto.id === chatRoomId);
				if (roomExists) return prev;
				return [
					...prev,
					{
						latestMessage: "",
						latestCreatedAt: "",
						roomDto: {
							name: chatRoomName,
							id: chatRoomId,
							profile: chatProfile,
						},
					},
				];
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
				{roomDataList && roomDataList?.map((room) => {
					return (
						<S.ChatBox
							ref={targetRef}
							key={room.roomDto.id}
							onClick={() => handleRouter(room.roomDto.id, room.roomDto.name, room.roomDto.profile ?? "")}
							isRead={params.id === room.roomDto.id || changeParamsId(params.id as string) === room.roomDto.id}
						>
							<S.Profile>
								<Image src={imageCheck(room?.roomDto?.profile || "")} alt={"profile"} fill/>
							</S.Profile>
							<S.Info>
								<h4>{room.roomDto.name}</h4>
								<p>{room.latestMessage?.startsWith(IMAGE_BASE || "") ? "이미지" : room.latestMessage}</p>
							</S.Info>
						</S.ChatBox>
					)
				})}
			</S.CategoryList>
		</S.MessageContainer>
	)
}