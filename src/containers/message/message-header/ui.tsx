"use client"

import React, {useState, useRef, useEffect} from "react"
import * as S from "./style"
import Image from "next/image"
import Message from "@/assets/meeting/profile.png"
import EllipsisIcon from '@/assets/post/ellipsis.svg';
import StateModal from "@/components/layout/stateModal";
import {useRouter} from "next/navigation";
import Square from "@/components/ui/button/square";
import AdditionRoom from "@/containers/message/additionRoom/ui";

interface FadeBoxProps {
	onClose: () => void;
	onInvite: () => void;
	onExit: () => void;
}

export const FadeBox = ({onClose, onInvite, onExit}: FadeBoxProps) => {
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
	const router = useRouter();
	
	const handleEllipsisClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};
	
	const handleInvite = () => {
		setIsAddition(true);
		setIsMenuOpen(false);
	};
	
	const handleExitClick = () => {
		setIsMenuOpen(false);
		setShowExitConfirm(true);
	};
	
	const confirmExit = () => {
		router.push('/message'); // Redirect to messages list
		setShowExitConfirm(false);
	};
	
	const cancelExit = () => {
		setShowExitConfirm(false);
	};
	const [isAddition, setIsAddition] = useState(false);
	const iconRef = useRef<HTMLImageElement>(null);
	return (
		<S.MessageHeaderContainer className="message-header">
			<S.ProfileBox>
				<S.Profile>
					<Image src={Message} alt="message" fill priority/>
				</S.Profile>
				<p>huhon123</p>
			</S.ProfileBox>
			<S.EllipsisIconBox ref={iconRef} onClick={handleEllipsisClick}>
				<Image
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
					iconRef={iconRef as React.RefObject<HTMLImageElement>}
					type={"update"}
				/>
				{showExitConfirm && (
					<StateModal close={cancelExit} isOpen={showExitConfirm}>
						<S.ConfirmModalContent>
							<h3>정말로 나가시겠습니까?</h3>
							<p>대화방을 나가면 대화내용이 삭제됩니다.</p>
							<S.ConfirmButtonGroup>
								<Square text={"취소"} status={false} width={"100%"} onClick={cancelExit}/>
								<Square text={"나가기"} status={true} width={'100%'} onClick={confirmExit}/>
							</S.ConfirmButtonGroup>
						</S.ConfirmModalContent>
					</StateModal>
				)}
			</S.EllipsisIconBox>
		</S.MessageHeaderContainer>
	);
}