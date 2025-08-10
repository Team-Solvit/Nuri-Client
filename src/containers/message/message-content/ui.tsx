"use client"

import * as S from "./style"
import {fakeData} from "./data"
import Profile from "@/assets/meeting/member-profile.png"
import Image from "next/image"
import React, {useEffect, useRef, useState} from "react";
import Reply from "@/assets/icon/reply.svg"
import Plus from "@/assets/icon/plus.svg";
import ContractModal from "@/containers/message/contract-modal/ui"
import RoomTourModal from "@/containers/message/roomtour-modal/ui"
import Square from '@/components/ui/button/square';
import {useModalStore} from "@/store/modal"
import {messageType, type, useMessageModalStore} from "@/store/messageModal"

import BasicMessage from "@/components/ui/message/BasicMessage";
import ReplyMessage from "@/components/ui/message/ReplyMessage";
import ImageMessage from "@/components/ui/message/ImageMessage";
import RoomTourMessage from "@/components/ui/message/RoomTourMessage";
import ContractMessage from "@/components/ui/message/ContractMessage";

export default function MessageContent() {
	let lastDate: string | null = null;
	const containerRef = useRef<HTMLDivElement>(null);
	const [replyInfo, setReplyInfo] = useState<null | { name: string, text: string }>(null);
	
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};
	
	useEffect(() => {
		scrollToBottom();
		const handleResize = () => scrollToBottom();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	const {open} = useModalStore();
	const {
		setMessageType,
		setType,
		open: messageModalOpen,
		setMaster,
		unSetMaster
	} = useMessageModalStore();
	
	
	const openContract = (type: type, messageType: messageType, isMaster: boolean) => {
		open();
		messageModalOpen();
		setType(type);
		setMessageType(messageType);
		if (isMaster) setMaster();
		else unSetMaster();
	};
	
	return (
		<S.ContainerBox>
			<ContractModal/>
			<RoomTourModal/>
			
			{replyInfo && (
				<S.ReplyPreviewContainer>
					<div style={{flex: 1}}>
						<S.ReplyPreviewName>{replyInfo.name}님에게 답장</S.ReplyPreviewName>
						<S.ReplyPreviewText>{replyInfo.text}</S.ReplyPreviewText>
					</div>
					<S.ReplyPreviewCloseBtn onClick={() => setReplyInfo(null)}>
						<Image style={{transform: 'rotate(45deg)'}} src={Plus} width={24} height={24} alt="close reply"/>
					</S.ReplyPreviewCloseBtn>
				</S.ReplyPreviewContainer>
			)}
			
			<S.MessageContentContainer ref={containerRef}>
				{fakeData.map((msg, idx) => {
					const nextUser = idx < fakeData.length && fakeData[idx + 1]?.type;
					const showDate = msg.date && msg.date !== lastDate;
					lastDate = msg.date || lastDate;
					const isLastOfTime =
						idx === fakeData.length - 1 ||
						fakeData[idx + 1].time !== msg.time ||
						fakeData[idx + 1].type !== msg.type;
					
					const isFirstOfTime =
						idx === 0 ||
						fakeData[idx - 1].time !== msg.time ||
						fakeData[idx - 1].type !== msg.type;
					const renderMessageBody = () => {
						if (msg.text === "" && msg.contract) {
							return (
								<ContractMessage
									thumbnail={msg.contract.thumbnail || '/assets/meeting/profile.png'}
									name={msg.contract.name || ""}
									time={isLastOfTime ? msg.time : undefined}
									isSent={msg.type === 'sent'}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract(msg.type, "contract", msg.type === "received")}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						if (msg.text === "" && msg.roomTour) {
							return (
								<RoomTourMessage
									thumbnail={msg.roomTour.thumbnail || '/assets/meeting/profile.png'}
									name={msg.roomTour.name || ""}
									date={msg.roomTour.date || ""}
									tourTime={msg.roomTour.time || ""}
									messageTime={isLastOfTime ? msg.time : undefined}
									isSent={msg.type === 'sent'}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract(msg.type, "roomtour", msg.type === "received")}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						if (msg.text === "" && msg.img) {
							return <ImageMessage src={msg.img} alt="img-msg" time={isLastOfTime ? msg.time : undefined}
							                     isSent={msg.type === 'sent'}/>;
						}
						return (
							<>
								{msg.replyTo && (
									<ReplyMessage
										type={msg.type}
										name={msg.replyTo.name || ""}
										text={msg.replyTo.text || ""}
										icon={<Image src={Reply} width={20} height={20} alt="reply"/>}
										time={isLastOfTime ? msg.time : undefined}
									/>
								)}
								<BasicMessage text={msg.text}
								              time={isLastOfTime ? msg.time : undefined}
								              isSent={msg.type === 'sent'}/>
							</>
						);
					};
					return (
						<div key={msg.id}>
							{showDate && <S.DateDivider>{msg.date}</S.DateDivider>}
							
							{msg.type === 'received' ? (
								<S.ReceivedMsgRow isSameUser={nextUser !== msg.type}>
									{isFirstOfTime ? (
										<S.ProfileImg isFirst={true}>
											{msg.profile && <Image src={Profile} fill alt={msg.name || 'profile'}/>}
										</S.ProfileImg>
									) : (
										<S.ProfileImg isFirst={false}/>
									)}
									
									<S.ReceivedMsgAndTimeWrapper isHaveReply={msg.replyTo?.text || ""}>
										{renderMessageBody()}
										<S.MsgHoverIcons className="msg-hover-icons"
										                 onClick={() => setReplyInfo({name: msg.name || '', text: msg.text})}
										>
											<Image
												src={Reply}
												width={20}
												height={20}
												alt="reply"
												style={{cursor: 'pointer'}}
											/>
										</S.MsgHoverIcons>
									</S.ReceivedMsgAndTimeWrapper>
								</S.ReceivedMsgRow>
							) : (
								<S.SentMsgRow isSameUser={nextUser !== msg.type}>
									<S.SentMsgAndTimeWrapper isHaveReply={msg.replyTo?.text || ""}>
										{renderMessageBody()}
									</S.SentMsgAndTimeWrapper>
								</S.SentMsgRow>
							)}
						</div>
					);
				})}
			</S.MessageContentContainer>
		</S.ContainerBox>
	);
}