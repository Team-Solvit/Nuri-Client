"use client";

import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import * as S from './style';

interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
}

// Mock data - replace with actual API call in production
const mockUsers: User[] = [
	{id: 1, name: '김철수', email: 'chulsoo@example.com'},
	{id: 2, name: '이영희', email: 'younghi@example.com'},
	{id: 3, name: '박민수', email: 'minsu@example.com'},
	{id: 4, name: '정지은', email: 'jieun@example.com'},
	{id: 5, name: '최준호', email: 'junho@example.com'},
];

export default function AdditionRoom({isAddition, setIsAddition, iconRef}: {
	isAddition: boolean;
	setIsAddition: (value: boolean) => void;
	iconRef: React.RefObject<HTMLImageElement>;
}) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);
	
	// Load users on component mount
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
	};
	
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
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
	
	const removeSelectedUser = (userId: number) => {
		setSelectedUsers(prev => prev.filter(user => user.id !== userId));
	};
	
	const handleCreateRoom = () => {
		handleClose();
	};
	
	const filteredUsers = users.filter(
		user =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	if (!isAddition) return null;
	
	return (
		<S.DropdownContainer ref={dropdownRef}>
			<S.Content>
				<S.SearchBar>
					<S.SearchInput
						type="text"
						placeholder="이름 또는 이메일로 검색"
						value={searchTerm}
						onChange={handleSearch}
					/>
				</S.SearchBar>
				
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
										<div style={{
											width: '100%',
											height: '100%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: '#e0e0e0',
											color: '#666',
											fontSize: '16px'
										}}>
											{user.name.charAt(0)}
										</div>
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
					onClick={handleCreateRoom}
					disabled={selectedUsers.length === 0}
				>
					{selectedUsers.length}명의 대화상대와 채팅방 만들기
				</S.ActionButton>
			</S.Content>
		</S.DropdownContainer>
	);
}