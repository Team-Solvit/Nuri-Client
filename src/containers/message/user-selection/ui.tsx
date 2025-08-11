"use client";

import React, {useState} from "react";
import Image from "next/image";
import * as S from "./style";
import Profile from "@/assets/meeting/profile.png"

const mockUsers = [
	{id: 1, name: "김하숙", avatar: "/meeting/banner.png"},
	{id: 2, name: "이하숙", avatar: "/meeting/banner.png"},
	{id: 3, name: "박하숙", avatar: "/meeting/banner.png"},
	{id: 4, name: "최하숙", avatar: "/meeting/banner.png"},
	{id: 5, name: "정하숙", avatar: "/meeting/banner.png"},
];

interface UserSelectionModalProps {
	onClose: () => void;
	onCreate: (selectedUserIds: number[]) => void;
}

const UserSelectionModal: React.FC<UserSelectionModalProps> = ({onClose, onCreate}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	
	const filteredUsers = mockUsers.filter(
		user =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!selectedUsers.includes(user.id)
	);
	
	const selectedUsersData = mockUsers.filter(user =>
		selectedUsers.includes(user.id)
	);
	
	const handleUserToggle = (userId: number) => {
		setSelectedUsers(prev =>
			prev.includes(userId)
				? prev.filter(id => id !== userId)
				: [...prev, userId]
		);
	};
	
	const handleCreateChat = () => {
		if (selectedUsers.length > 0) {
			onCreate(selectedUsers);
			onClose();
		}
	};
	
	return (
		<S.ModalOverlay onClick={onClose}>
			<S.ModalContent onClick={e => e.stopPropagation()}>
				<S.Title>채팅방 만들기</S.Title>
				<S.SearchInput
					type="text"
					placeholder="사용자 검색"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				{selectedUsersData.length > 0 && <S.SelectedUsersContainer>
					{selectedUsersData.map(user => (
						<S.UserTag
							key={`selected-${user.id}`}
							onClick={() => handleUserToggle(user.id)}
						>
							<S.UserTagAvatar>
								<Image
									src={Profile}
									alt={user.name}
									style={{objectFit: 'cover'}}
									fill
								/>
							</S.UserTagAvatar>
							<S.UserTagName>{user.name}</S.UserTagName>
							<S.UserTagRemove>×</S.UserTagRemove>
						</S.UserTag>
					))}
        </S.SelectedUsersContainer>}
				<S.UserList>
					{filteredUsers.map(user => (
						<S.UserItem key={user.id}>
							<S.Checkbox
								type="checkbox"
								checked={selectedUsers.includes(user.id)}
								onChange={() => handleUserToggle(user.id)}
							/>
							<S.UserAvatar>
								<Image
									src={Profile}
									alt={user.name}
									style={{objectFit: 'cover'}}
									fill
								/>
							</S.UserAvatar>
							<S.UserName>{user.name}</S.UserName>
						</S.UserItem>
					))}
				</S.UserList>
				<S.ButtonContainer>
					<S.Button
						variant="secondary"
						onClick={onClose}
						style={{width: '50%'}}
					>
						취소
					</S.Button>
					<S.Button
						variant="primary"
						onClick={handleCreateChat}
						disabled={selectedUsers.length === 0}
						style={{width: '50%'}}
					>
						채팅방 만들기
					</S.Button>
				</S.ButtonContainer>
			</S.ModalContent>
		</S.ModalOverlay>
	);
};

export default UserSelectionModal;
