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
import { useUserStore } from "@/store/user";

interface FadeBoxProps {
	onClose: () => void;
	onInvite: () => void;
	onExit: () => void;
	canInvite: boolean;
}

export const FadeBox = ({ onClose, onInvite, onExit, canInvite }: FadeBoxProps) => {
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
			{canInvite && <S.MenuButton onClick={onInvite}>초대하기</S.MenuButton>}
		</S.FadeBoxContainer>
	);
}

// 멤버 데이터 파싱 함수
interface MemberData {
	userId: string;
	invitePermission: boolean;
}

const parseMemberData = (memberString: string): MemberData => {
	const userIdMatch = memberString.match(/userId=([^,}]+)/);
	const permissionMatch = memberString.match(/invitePermission=(true|false)/);
	
	return {
		userId: userIdMatch ? userIdMatch[1] : '',
		invitePermission: permissionMatch ? permissionMatch[1] === 'true' : false
	};
};

export default function MessageHeaderUI() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showExitConfirm, setShowExitConfirm] = useState(false);
	const [showMemberList, setShowMemberList] = useState(false);
	const [kickingUserId, setKickingUserId] = useState<string | null>(null);
	const navigate = useNavigationWithProgress()
	const [isLoading, setIsLoading] = useState(false)

	const params = useParams();
	const roomId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? '';

	// GET_ROOM_MEMBER 쿼리를 사용하여 실제 멤버 수 가져오기
	const { data: roomMemberData, refetch } = useQuery(MessageQueries.GET_ROOM_MEMBER, {
		variables: { roomId },
		skip: !roomId,
	});
	
	// roomDataList에서 현재 roomId의 isTeam 정보 가져오기
	const { roomDataList } = useMessagePageStore();
	const currentRoom = useMemo(() => {
		return roomDataList.find(room => room.roomDto?.id === roomId);
	}, [roomDataList, roomId]);
	
	const { message } = useMessageReflectStore()

	const memberIds = useMemo(() => {
		const rawData = roomMemberData?.getUserIds || [];
		return rawData.map((member: string) => parseMemberData(member));
	}, [roomMemberData?.getUserIds]);
	
	const { userId: currentUserId } = useUserStore();
	
	// 방장 수 계산
	const hostCount = useMemo(() => {
		return memberIds.filter((m: MemberData) => m.invitePermission).length;
	}, [memberIds]);
	
	// 방장이 2명 이상이면 일반 채팅방으로 처리
	const isTeamChat = hostCount === 1 && (currentRoom?.roomDto?.isTeam ?? false);
	
	// 현재 사용자가 초대 권한이 있는지 확인
	const currentUserMember = memberIds.find((m: MemberData) => m.userId === currentUserId);
	const canInvite = isTeamChat 
		? currentUserMember?.invitePermission ?? false  // 팀 채팅: 방장만 가능
		: true;  // 일반 채팅 or 방장 2명 이상: 모두 가능

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
		if (isTeamChat && !currentUserMember?.invitePermission) {
			console.log("초대 권한 없음");
			error("팀 채팅에서는 방장만 멤버를 초대할 수 있습니다");
			setIsMenuOpen(false);
			return;
		}else{
			setIsAddition(true);
			setIsMenuOpen(false);
		}
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
		console.log(memberId);
		// memberCount가 3 이상이면 프로필 이동 차단
		if (memberIds?.length >= 3) return;
		navigate(`/profile/${memberId}`);
	};

	const handleKickMember = async (userId: string) => {
		if (!roomId) return;
		try {
			setKickingUserId(userId);
			await MessageService.kickChatRoom(apolloClient, roomId, userId);
			success(`${userId}님을 추방했습니다.`);
			await refetch();
		} catch {
			error('멤버 추방에 실패했습니다.');
		} finally {
			setKickingUserId(null);
		}
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
	const { chatProfile, chatRoomName, roomId:headerRoomId } = useMessageHeaderStore()
	return (
		<S.MessageHeaderContainer className="message-header">
			{/*모바일이면 나오는 뒤로가기 버튼*/}
			<S.BackButton onClick={() => navigate('/message')}>
				<Image src={"/icons/arrow.svg"} style={{ transform: "rotate(180deg)" }} alt="back" width={24} height={24} />
			</S.BackButton>
			<S.ProfileBox>
				<S.Profile onClick={()=>handleMemberClick(chatRoomName)}>
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
								{memberIds.map((member: MemberData, index: number) => {
									const isHost = member.invitePermission && isTeamChat; // 팀 채팅일 때만 방장 표시
									const canKick = isTeamChat && currentUserMember?.invitePermission && !member.invitePermission; // 팀 채팅에서 방장만 일반 멤버 추방 가능
									return(
									<S.MemberItem
										key={index}
										onClick={() => handleMemberClick(member.userId)}
									>
										<S.MemberAvatar>{member.userId.slice(0, 1).toUpperCase()}</S.MemberAvatar>
										<S.MemberInfo>
											<S.MemberName>
												{member.userId}
												{isHost && <S.HostBadge>방장</S.HostBadge>}
											</S.MemberName>
										</S.MemberInfo>
										{canKick && (
											<S.KickButton
												onClick={(e) => {
													e.stopPropagation();
													handleKickMember(member.userId);
												}}
												disabled={kickingUserId === member.userId}
											>
												{kickingUserId === member.userId ? '추방 중...' : '추방'}
											</S.KickButton>
										)}
									</S.MemberItem>
								)
								})}
							</S.MemberList>
						</S.MemberListContainer>
					)}
				</div>
			</S.ProfileBox>
			{memberIds?.length > 2 && (
				<S.EllipsisIconBox>
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
							canInvite={canInvite}
						/>
					)}
					<AdditionRoom
						isAddition={isAddition}
						setIsAddition={setIsAddition}
						iconRef={iconRef as React.RefObject<HTMLImageElement
						>}
						type={"update"}
						existingMembers={memberIds.map((m: MemberData) => m.userId)}
						refetchMembers={refetch}
					/>
				</S.EllipsisIconBox>
			)}
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
		</S.MessageHeaderContainer>
	);
}