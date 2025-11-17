"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import * as S from './style';
import { MessageQueries, MessageService } from "@/services/message";
import { useApollo } from "@/lib/apolloClient";
import { RoomCreateRequestDto } from "@/types/message";
import { useParams } from "next/navigation";
import { useAlertStore } from "@/store/alert";
import { useQuery } from "@apollo/client";
import { useUserStore } from "@/store/user";
import { useMessageDmManageStore } from "@/store/messageDmManage";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useLoadingEffect } from "@/hooks/useLoading";
import { useMessageConnectStore } from "@/store/messageConnect";
import { client } from "@/lib/socketClient";
import { useMessageReflectStore } from "@/store/messageReflect";
import { useMessageAlertStore } from "@/store/messageAlert";
import { useMessageHeaderStore } from "@/store/messageHeader";
import { imageCheck } from "@/utils/imageCheck";
import { usePermissionGuard } from "@/hooks/usePermissionGuard";
import { ms } from 'date-fns/locale';

interface User {
	userId: string;
	name: string;
	profile: string;
}

export default function AdditionRoom({ isAddition, setIsAddition, iconRef, type, existingMembers = [], refetchMembers }: {
	isAddition: boolean;
	setIsAddition: (value: boolean) => void;
	iconRef: React.RefObject<HTMLImageElement>;
	type: "add" | "update";
	existingMembers?: string[];
	refetchMembers?: () => void;
}) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);
	// 프로필 이미지 업로드(추가 모드에서만 사용)
	const [profilePreview, setProfilePreview] = useState<string | null>(null);
	const [profileDataUrl, setProfileDataUrl] = useState<string | null>(null);
	const { upload, loading: uploadLoading } = useFileUpload();

	const [debouncedTerm, setDebouncedTerm] = useState("");

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedTerm(searchTerm), 300);
		return () => clearTimeout(handler);
	}, [searchTerm]);

	const { data: searchUserResult } = useQuery(
		MessageQueries.GET_USER_SEARCH,
		{
			variables: { userId: debouncedTerm },
			skip: !debouncedTerm,
		}
	);

	const existingMembersKey = useMemo(
		() => existingMembers.join(','),
		[existingMembers]
	);
	useEffect(() => {
		const searchResults = searchUserResult?.queryUsers || [];
		// 이미 초대된 멤버들을 검색 결과에서 제외
		const filteredUsers = searchResults.filter((user: User) =>
			!existingMembers.includes(user.userId)
		);
		setUsers(filteredUsers);
	}, [searchUserResult, existingMembersKey]); // 배열을 문자열로 변환하여 안정적인 의존성 만들기

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!iconRef?.current?.contains(event.target as Node)
			) {
				handleClose();
			}
		}

		if (isAddition) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isAddition]);

	const handleClose = () => {
		setIsAddition(false);
		setSearchTerm('');
		setSelectedUsers([]);
		if (profilePreview) URL.revokeObjectURL(profilePreview);
		setProfilePreview(null);
		setProfileDataUrl(null);
	};

	const { success, error } = useAlertStore();
	// Service 영역(채팅생성, 채팅초대)
	const apolloClient = useApollo()
	const params = useParams();
	const roomId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";

	const { setValues: setHeader, chatProfile, chatRoomName, memberCount } = useMessageHeaderStore()
	const inviteSuccess = (num: number) => {
		setHeader({
			chatProfile,
			chatRoomName,
			memberCount: memberCount + num
		})
	}
	const handleInviteChatMember = async (roomId: string) => {
		const inviteChatMemberInput = {
			users: selectedUsers.map(user => user.userId),
			roomId: roomId
		}
		try {
			setLoading(true);
			await MessageService.inviteUserInChatRoom(
				apolloClient,
				inviteChatMemberInput,
				inviteSuccess
			)
			success("채팅방 초대에 성공하였습니다.")
			// 초대 완료 후 멤버 목록 refetch
			if (refetchMembers) {
				refetchMembers();
			}
			handleClose();
		} catch {
			error("채팅방 초대에 실패하였습니다.")
		} finally {
			setLoading(false);
		}
	}

	const handleAddition = async () => {
		if (type === "add") {
			await handleCreateRoom()
		} else {
			await handleInviteChatMember(roomId);
		}
	}

	const [loading, setLoading] = useState(false);
	const { userId: id } = useUserStore()
	const { addSubscription } = useMessageConnectStore()
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	const { withPermission } = usePermissionGuard();
	
	const handleCreateRoom = async () => {
		if (!roomName.trim()) {
			error("채팅방 이름을 입력해주세요.");
			return;
		}
		if (selectedUsers.length < 2) {
			error("채팅방의 인원수가 부족합니다.")
			return;
		}
		
		setLoading(true);
		
		const inputData: RoomCreateRequestDto = {
			roomDto: {
				name: roomName,
				profile: profileDataUrl ?? null
			},
			users: [...selectedUsers.map(user => user.userId), id || ""],
			isTeam: false
		}
		try {
			const res = await MessageService.createChatRoom(apolloClient, inputData);
			const roomId = res?.data?.createRoom?.id
			if (roomId) {
				success("채팅방을 생성했습니다.");
				if (inputData.users.length > 10) {
					addSubscription(roomId,
						client.subscribe(`/chat/messages/${roomId}`, (msg) => {
							const msgData = JSON.parse(msg.body);
							setMessage(msgData);
							fadeIn(
								msgData.sender?.profile,
								msgData?.roomId,
								msgData.sender?.name,
								msgData.contents,
								msgData.sendAt
							);
						}))
				}
				handleClose();
				setValues({
					chatProfile: profileDataUrl ?? "",
					chatRoomId: res?.data?.createRoom?.id,
					chatRoomName: roomName,
					isOpen: true,
				});
			} else {
				error("채팅방 생성에 실패하였습니다.");
			}
		} catch {
			error("채팅방 생성 중 오류가 발생하였습니다.");
		} finally {
			setLoading(false);
		}
	};


	// 컴포넌트 언마운트 시 Object URL 정리
	useEffect(() => {
		return () => {
			if (profilePreview) {
				URL.revokeObjectURL(profilePreview);
			}
		};
	}, [profilePreview]);
	// 이미지 관리
	const profileRef = useRef<HTMLInputElement | null>(null);

	const handleProfileUpload = () => {
		if (!profileRef.current) return;
		profileRef.current.click();
	};


	// 프로필 이미지 파일 선택 핸들러
	const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			if (profilePreview) URL.revokeObjectURL(profilePreview);
			setProfilePreview(null);
			setProfileDataUrl(null);
			return;
		}

		// 형식/용량 검증
		const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
		const MAX_SIZE = 5 * 1024 * 1024; // 5MB
		if (!ALLOWED.includes(file.type)) {
			error("지원되지 않는 파일 형식입니다.");
			e.currentTarget.value = "";
			return;
		}
		if (file.size > MAX_SIZE) {
			error("파일 용량은 5MB 이하여야 합니다.");
			e.currentTarget.value = "";
			return;
		}
		// 미리보기는 object URL, 전송은 base64 DataURL 사용
		const objectUrl = URL.createObjectURL(file);
		if (profilePreview) URL.revokeObjectURL(profilePreview);
		setProfilePreview(objectUrl);
		try {
			const [uploaded] = await upload([file]);
			if (uploaded) {
				setProfileDataUrl(uploaded);
			}
		} catch {
			setProfilePreview(null);
			setProfileDataUrl(null);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const removeSelectedUser = (userId: string) => {
		setSelectedUsers(prev => prev.filter(user => user.userId !== userId));
	};

	const toggleUserSelection = (user: User) => {
		setSelectedUsers(prev => {
			const isSelected = prev.some(u => u.userId === user.userId);
			if (isSelected) {
				return prev.filter(u => u.userId !== user.userId);
			} else {
				return [...prev, user];
			}
		});
	};
	const [roomName, setRoomName] = useState<string>("");
	const { setValues } = useMessageDmManageStore();
	useLoadingEffect(uploadLoading);
	if (!isAddition) return null;

	return (
		<S.DropdownContainer
			onClick={(e) => {
				e.stopPropagation();
			}}
			ref={dropdownRef}
		>
			<S.Content>
				{type === "add" && <S.SearchBar>
					<S.SearchInput
						type="text"
						placeholder="채팅방 이름을 입력해주세요"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
					/>
				</S.SearchBar>}
				<S.SearchBar>
					<S.SearchInput
						type="text"
						placeholder="대화 상대 아이디를 입력해주세요"
						value={searchTerm}
						onChange={handleSearch}
					/>
				</S.SearchBar>

				{type === "add" && (
					<S.ProfileUploadContainer>
						<S.ProfilePreviewBox>
							{profilePreview ? (
								<Image
									src={profilePreview}
									alt="프로필 미리보기"
									width={56}
									height={56}
									style={{ objectFit: 'cover' }}
								/>
							) : (
								<span style={{ color: '#999', fontSize: 12 }}>미리보기</span>
							)}
						</S.ProfilePreviewBox>
						<S.FileInput
							ref={profileRef}
							type="file"
							accept="image/*"
							onChange={handleProfileChange}
						/>
						{profilePreview ? (
							<S.RemoveImageButton
								onClick={() => {
									if (profilePreview) URL.revokeObjectURL(profilePreview);
									setProfilePreview(null);
									setProfileDataUrl(null);
								}}
							>
								프로필 이미지 제거
							</S.RemoveImageButton>
						) :
							<S.FileLabel onClick={handleProfileUpload}>
								<span>채팅방 이미지 선택</span>
							</S.FileLabel>
						}
					</S.ProfileUploadContainer>
				)}

				{selectedUsers.length > 0 && (
					<S.SelectedUsers>
						{selectedUsers.map(user => (
							<S.UserTag onClick={() => removeSelectedUser(user.userId)} key={`selected-${user.userId}`}>
								{user.userId}
								<S.RemoveButton>
									×
								</S.RemoveButton>
							</S.UserTag>
						))}
					</S.SelectedUsers>
				)}

				<S.UserList>
					{users?.map(user => {
						const isSelected = selectedUsers.some(u => u.userId === user.userId);
						const isMe = user.userId === id;
						console.log(user, isMe, isSelected, imageCheck(user.profile))
						if (isMe) return null
						return (
							<S.UserItem
								key={user.userId}
								isSelected={isSelected}
								onClick={() => toggleUserSelection(user)}
							>
								<S.UserAvatar>
									{user.profile ? (
										<Image
											src={imageCheck(user.profile)}
											alt={user.name}
											width={40}
											height={40}
										/>
									) : (
										<S.AvatarFallback>
											{user.name.charAt(0)}
										</S.AvatarFallback>
									)}
								</S.UserAvatar>
								<S.UserInfo>
									<S.UserName>{user.name}</S.UserName>
									<S.UserEmail>{user.userId}</S.UserEmail>
								</S.UserInfo>
								<input
									type="checkbox"
									checked={isSelected}
									onChange={() => toggleUserSelection(user)}
									onClick={e => e.stopPropagation()}
								/>
							</S.UserItem>
						);
					})}
				</S.UserList>

				<S.ActionButton
					onClick={() => withPermission(handleAddition)}
					disabled={
						selectedUsers.length === 0 ||
						loading ||
						(type === "add" && selectedUsers.length < 2 && !roomName.trim())
					}
				>
					{loading
						? "로딩중입니다"
						: (type === "add"
							? `${selectedUsers.length}명의 대화상대와 채팅방 만들기`
							: `${selectedUsers.length}명의 대화상대 초대하기`)}
				</S.ActionButton>
			</S.Content>
		</S.DropdownContainer>
	);
}