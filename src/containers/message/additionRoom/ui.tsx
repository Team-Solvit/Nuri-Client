"use client";

import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import * as S from './style';
import {MessageService} from "@/services/message";
import {useApollo} from "@/lib/apolloClient";
import {RoomCreateRequestDto} from "@/types/message";
import {useParams} from "next/navigation";
import {useAlertStore} from "@/store/alert";

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

// Mock data - replace with actual API call in production
const mockUsers: User[] = [
	{id: "1", name: '김철수', email: 'chulsoo@example.com'},
	{id: "2", name: '이영희', email: 'younghi@example.com'},
	{id: "3", name: '박민수', email: 'minsu@example.com'},
	{id: "4", name: '정지은', email: 'jieun@example.com'},
	{id: "5", name: '최준호', email: 'junho@example.com'},
];

export default function AdditionRoom({isAddition, setIsAddition, iconRef, type}: {
	isAddition: boolean;
	setIsAddition: (value: boolean) => void;
	iconRef: React.RefObject<HTMLImageElement>;
	type: "add" | "update"
}) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);
	// 프로필 이미지 업로드(추가 모드에서만 사용)
	const [profilePreview, setProfilePreview] = useState<string | null>(null);
	const [profileDataUrl, setProfileDataUrl] = useState<string | null>(null);
	
	useEffect(() => {
		setUsers(mockUsers);
	}, []);
	
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
		setProfilePreview(null);
		setProfileDataUrl(null);
	};
	
	const {success, error} = useAlertStore();
	// Service 영역(채팅생성, 채팅초대)
	const apolloClient = useApollo()
	const params = useParams();
	const roomId = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";
	
	const handleInviteChatMember = async (roomId: string) => {
		const inviteChatMemberInput = {
			users: selectedUsers.map(user => user.id),
			roomId: roomId
		}
		try {
			await MessageService.inviteUserInChatRoom(
				apolloClient,
				inviteChatMemberInput
			)
			success("채팅방 초대에 성공하였습니다.")
			handleClose();
		} catch (e) {
			console.log(e)
			error("채팅방 초대에 실패하였습니다.")
		}
	}
	
	const handleAddition = async () => {
		if (type === "add") {
			await handleCreateRoom()
		} else {
			await handleInviteChatMember(roomId);
		}
	}
	
	const handleCreateRoom = async () => {
		const inputData: RoomCreateRequestDto = {
			roomDto: {
				name: "test",
				profile: "profile.png"
			},
			users: ["zuu4", "zuu5"],
			isTeam: false
		}
		try {
			await MessageService.createChatRoom(
				apolloClient,
				inputData
			);
			success("채팅방 생성에 성공하였습니다.")
			handleClose();
		} catch (e) {
			console.log(e)
			error("채팅방 생성에 실패하였습니다.")
		}
	};
	
	
	// 이미지 관리
	const profileRef = useRef<HTMLInputElement | null>(null);
	
	const handleProfileUpload = () => {
		if (!profileRef.current) return;
		profileRef.current.click();
	};
	
	
	// 프로필 이미지 파일 선택 핸들러
	const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			setProfilePreview(null);
			setProfileDataUrl(null);
			return;
		}
		// 미리보기는 object URL, 전송은 base64 DataURL 사용
		const objectUrl = URL.createObjectURL(file);
		setProfilePreview(objectUrl);
		
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				setProfileDataUrl(reader.result); // data:image/...;base64,xxxx
			}
		};
		reader.readAsDataURL(file);
	};
	
	// 유저 관리
	const filteredUsers = users.filter(
		user =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	
	const removeSelectedUser = (userId: string) => {
		setSelectedUsers(prev => prev.filter(user => user.id !== userId));
	};
	
	const toggleUserSelection = (user: User) => {
		setSelectedUsers(prev => {
			const isSelected = prev.some(u => u.id === user.id);
			if (isSelected) {
				return prev.filter(u => u.id !== user.id);
			} else {
				return [...prev, user];
			}
		});
	};
	if (!isAddition) return null;
	
	return (
		<S.DropdownContainer
			onClick={(e) => {
				e.stopPropagation();
			}}
			ref={dropdownRef}
		>
			<S.Content>
				<S.SearchBar>
					<S.SearchInput
						type="text"
						placeholder="이름 또는 이메일로 검색"
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
									style={{objectFit: 'cover'}}
								/>
							) : (
								<span style={{color: '#999', fontSize: 12}}>미리보기</span>
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
										setProfilePreview(null);
										setProfileDataUrl(null);
									}}
								>
									프로필 이미지 제거
								</S.RemoveImageButton>
							) :
							<S.FileLabel onClick={handleProfileUpload}>
								<span>프로필 이미지 선택</span>
							</S.FileLabel>
						}
					</S.ProfileUploadContainer>
				)}
				
				{selectedUsers.length > 0 && (
					<S.SelectedUsers>
						{selectedUsers.map(user => (
							<S.UserTag onClick={() => removeSelectedUser(user.id)} key={`selected-${user.id}`}>
								{user.name}
								<S.RemoveButton>
									×
								</S.RemoveButton>
							</S.UserTag>
						))}
					</S.SelectedUsers>
				)}
				
				<S.UserList>
					{filteredUsers.map(user => {
						const isSelected = selectedUsers.some(u => u.id === user.id);
						return (
							<S.UserItem
								key={user.id}
								isSelected={isSelected}
								onClick={() => toggleUserSelection(user)}
							>
								<S.UserAvatar>
									{user.avatar ? (
										<Image
											src={user.avatar}
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
									<S.UserEmail>{user.email}</S.UserEmail>
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
					onClick={handleAddition}
					disabled={selectedUsers.length === 0}
				>
					{selectedUsers.length}{type === "add" ? "명의 대화상대와 채팅방 만들기" : "명의 대화상대 초대하기"}
				</S.ActionButton>
			</S.Content>
		</S.DropdownContainer>
	);
}