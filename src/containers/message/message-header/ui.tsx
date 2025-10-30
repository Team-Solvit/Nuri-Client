"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import * as S from "./style"
import Image from "next/image"
import EllipsisIcon from '@/assets/post/ellipsis.svg';
import StateModal from "@/components/layout/stateModal";
import { useParams } from "next/navigation";
import Square from "@/components/ui/button/square";
import AdditionRoom from "@/containers/message/additionRoom/ui";
import { MessageService, MessageQueries } from "@/services/message";
import { useApollo } from "@/lib/apolloClient";
import { useAlertStore } from "@/store/alert";
import { useMessageHeaderStore } from "@/store/messageHeader";
import { imageCheck } from "@/utils/imageCheck";
import { useMessagePageStore } from "@/store/messagePage";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useLoadingEffect } from "@/hooks/useLoading";
import { useQuery } from "@apollo/client";
import { useMessageReflectStore } from "@/store/messageReflect";

interface FadeBoxProps {
	onClose: () => void;
	onInvite: () => void;
	onExit: () => void;
}

export const FadeBox = ({ onClose, onInvite, onExit }: FadeBoxProps) => {
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<S.FadeBoxContainer ref={boxRef}>
			<S.MenuButton onClick={onExit}>나가기</S.MenuButton>
			<S.MenuButton onClick={onInvite}>초대하기</S.MenuButton>
		</S.FadeBoxContainer>
	);
}

export default function MessageHeaderUI() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showExitConfirm, setShowExitConfirm] = useState(false);
	const [showMemberList, setShowMemberList] = useState(false);
	const navigate = useNavigationWithProgress()
	const [isLoading, setIsLoading] = useState(false)

	const params = useParams();
	const roomId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? '';

	// GET_ROOM_MEMBER 쿼리를 사용하여 실제 멤버 수 가져오기
	const { data: roomMemberData, refetch } = useQuery(MessageQueries.GET_ROOM_MEMBER, {
		variables: { roomId },
		skip: !roomId,
	});
	const { message } = useMessageReflectStore()

	const memberIds = useMemo(() => {
		return roomMemberData?.getUserIds || [];
	}, [roomMemberData?.getUserIds]);

	useEffect(() => {
		if (!message || !refetch) return;

		const exitMatch = message.contents?.match(/^(.+?)\s+exit$/);
		if (exitMatch) {
			refetch();
		}
	}, [message, refetch]);

	const memberListRef = useRef<HTMLDivElement>(null);

	// 멤버 목록 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (memberListRef.current && !memberListRef.current.contains(event.target as Node)) {
				setShowMemberList(false);
			}
		};

		if (showMemberList) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMemberList]);

	const handleMemberCountClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowMemberList(!showMemberList);
	};
	// 채팅방 멤버 초대
	const handleInvite = () => {
		setIsAddition(true);
		setIsMenuOpen(false);
	};

	// 채팅방 나가기
	const handleExitClick = () => {
		setIsMenuOpen(false);
		setShowExitConfirm(true);
	};


	const handleEllipsisClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
		setIsAddition(false);
	};

	const handleMemberClick = (memberId: string) => {
		navigate(`/profile/${memberId}`);
	};

	const confirmExit = async () => {
		try {
			setIsLoading(true)
			const res = await MessageService.exitChatRoom(apolloClient, roomId, page);
			setRoomDataList(res.data.getRooms);
			navigate('/message');
			setShowExitConfirm(false);
			success("대화방 나가기에 성공하였습니다.")
		} catch {
			error("대화방 나가기에 실패하였습니다.")
		} finally {
			setIsLoading(false)
		}
	};

	const cancelExit = () => {
		setShowExitConfirm(false);
	};

	const apolloClient = useApollo();

	const { success, error } = useAlertStore();
	const page = useMessagePageStore(s => s.page);
	const setRoomDataList = useMessagePageStore(s => s.setRoomDataList)
	const [isAddition, setIsAddition] = useState(false);
	const iconRef = useRef<HTMLImageElement>(null);

	useLoadingEffect(isLoading)
	const { chatProfile, chatRoomName } = useMessageHeaderStore()
	return (
		<S.MessageHeaderContainer className="message-header">
			{/*모바일이면 나오는 뒤로가기 버튼*/}
			<S.BackButton onClick={() => navigate('/message')}>
				<Image src={"/icons/arrow.svg"} style={{ transform: "rotate(180deg)" }} alt="back" width={24} height={24} />
			</S.BackButton>
			<S.ProfileBox>
				<S.Profile>
					<Image src={imageCheck(chatProfile || "") || "/post/default.png"} alt="message" fill priority />
				</S.Profile>
				<div style={{ position: 'relative' }}>
					<p>
						{chatRoomName}
						{memberIds?.length > 2 && (
							<S.MemberCount onClick={handleMemberCountClick}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
								</svg>
								<span>{memberIds?.length}명</span>
							</S.MemberCount>
						)}
					</p>
					{showMemberList && memberIds?.length > 2 && (
						<S.MemberListContainer ref={memberListRef}>
							<S.MemberListHeader>
								대화 참여자 <span>{memberIds.length}명</span>
							</S.MemberListHeader>
							<S.MemberList>
								{memberIds.map((memberId: string, index: number) => (
									<S.MemberItem
										key={index}
										onClick={() => handleMemberClick(memberId)}
									>
										<S.MemberAvatar>{memberId.slice(0, 1).toUpperCase()}</S.MemberAvatar>
										<S.MemberInfo>
											<S.MemberName>{memberId}</S.MemberName>
										</S.MemberInfo>
									</S.MemberItem>
								))}
							</S.MemberList>
						</S.MemberListContainer>
					)}
				</div>
			</S.ProfileBox>
			<S.EllipsisIconBox
			>
				<Image
					ref={iconRef}
					onClick={handleEllipsisClick}
					src={EllipsisIcon}
					fill
					alt={"ellipsis-icon"}
					priority
				/>
				{isMenuOpen && (
					<FadeBox
						onClose={() => setIsMenuOpen(false)}
						onInvite={handleInvite}
						onExit={handleExitClick}
					/>
				)}
				<AdditionRoom
					isAddition={isAddition}
					setIsAddition={setIsAddition}
					iconRef={iconRef as React.RefObject<HTMLImageElement
					>}
					type={"update"}
					existingMembers={memberIds}
					refetchMembers={refetch}
				/>
				{showExitConfirm && (
					<StateModal close={cancelExit} isOpen={showExitConfirm}>
						<S.ConfirmModalContent>
							<h3>정말로 나가시겠습니까?</h3>
							<p>대화방을 나가면 대화내용이 삭제됩니다.</p>
							<S.ConfirmButtonGroup>
								<Square text={"취소"} status={false} width={"100%"} onClick={cancelExit}/>
								<Square text={"나가기"} status={true} width={'100%'} onClick={confirmExit} isLoading={isLoading}/>
							</S.ConfirmButtonGroup>
						</S.ConfirmModalContent>
					</StateModal>
				)}
			</S.EllipsisIconBox>
		</S.MessageHeaderContainer>
	);
}