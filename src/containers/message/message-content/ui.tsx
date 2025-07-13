"use client"

import * as S from "./style"
import {fakeData} from "./data"
import Profile from "@/assets/meeting/member-profile.png"
import Image from "next/image"
import {useEffect, useRef, useState} from "react";
import Heart from "@/assets/icon/heart.svg"
import Reply from "@/assets/icon/reply.svg"
import Plus from "@/assets/icon/plus.svg";
import ContractModal from "@/containers/message/contract-modal/ui"
import RoomTourModal from "@/containers/message/roomtour-modal/ui"
import Square from '@/components/ui/button/square';
import { useModalStore } from "@/store/modal"
import { messageType, type, useMessageModalStore } from "@/store/messageModal"

export default function MessageContent() {
	let lastDate: string | null = null;
	const containerRef = useRef<HTMLDivElement>(null);
	const [replyInfo, setReplyInfo] = useState<null | {name: string, text: string}>(null);
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};
	
	useEffect(() => {
		scrollToBottom(); // 초기 렌더링 시 한 번
		
		const handleResize = () => {
			scrollToBottom(); // 창 크기 변경 시에도 스크롤 아래로
		};
		
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const {open, isOpen} = useModalStore();
	const {setMessageType, setType, isOpen : ee, messageType : real, open : messageModalOpen, setMaster, unSetMaster} = useMessageModalStore();
	
	const openContract = (type : type, messageType : messageType, isMaster : boolean) =>{
		open();
		messageModalOpen();
		setType(type);
		setMessageType(messageType);
		if(isMaster) setMaster();
		else unSetMaster();
		console.log(real);
		console.log(ee)
		console.log(isOpen)
	}
	return (
		<div style={{width:"100%", height:"82%", position:"relative"}}>
			<ContractModal />
			<RoomTourModal />
			{/* 답장 미리보기 UI */}
			{replyInfo && (
				<S.ReplyPreviewContainer>
					<div style={{flex: 1}}>
						<S.ReplyPreviewName>
							{replyInfo.name}님에게 답장
						</S.ReplyPreviewName>
						<S.ReplyPreviewText>
							{replyInfo.text}
						</S.ReplyPreviewText>
					</div>
					<S.ReplyPreviewCloseBtn onClick={() => setReplyInfo(null)}>
						<Image style={{ transform: 'rotate(45deg)' }} src={Plus} width={24} height={24} alt="close reply" />
					</S.ReplyPreviewCloseBtn>
				</S.ReplyPreviewContainer>
			)}
			<S.MessageContentContainer ref={containerRef}>
				{fakeData.map((msg, idx) => {
					const showDate = msg.date && msg.date !== lastDate;
					lastDate = msg.date || lastDate;
					// 같은 시간의 마지막 메시지에만 시간 표시
					const isLastOfTime =
						idx === fakeData.length - 1 || fakeData[idx + 1].time !== msg.time;
					return (
						<div key={msg.id}>
							{showDate && <S.DateDivider>{msg.date}</S.DateDivider>}
							{msg.type === 'received' ? (
								<S.ReceivedMsgRow>
									{(idx === 0 || fakeData[idx - 1].time !== msg.time) ? (
										<S.ProfileImg isFirst={true}>
											{msg.profile && (
												<Image src={Profile} fill alt={msg.name || 'profile'}/>
											)}
										</S.ProfileImg>
									) : (
										<S.ProfileImg isFirst={false}/>
									)}
									<S.ReceivedMsgAndTimeWrapper isHaveReply={msg.replyTo?.text}>
										{msg.text === "" && (msg.contract || msg.roomTour) ? (
											msg.type === 'sent' ? (
												msg.contract ? (
													<S.ContractBubble style={{marginLeft: 'auto'}}>
														<Image
															src={msg.contract.thumbnail || '/assets/meeting/profile.png'}
															alt="contract-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.ContractContent>
															<S.ContractTitle>계약이 완료되었어요</S.ContractTitle>
															<S.ContractHouse>{msg.contract.name}</S.ContractHouse>
															<S.ContractButtonWrapper>
																<Square text="자세히보기" onClick={()=>{
																	openContract("sent", "contract", true)
																}} status={true} width="100%" />
															</S.ContractButtonWrapper>
														</S.ContractContent>
													</S.ContractBubble>
												) : (
													<S.RoomTourBubble style={{marginLeft: 'auto'}}>
														<Image
															src={msg.roomTour?.thumbnail || '/assets/meeting/profile.png'}
															alt="roomtour-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.RoomTourContent>
															<S.RoomTourTitle>룸투어를 예약했어요</S.RoomTourTitle>
															<S.RoomTourHouse>{msg.roomTour?.name}</S.RoomTourHouse>
															<S.RoomTourDate>날짜 : {msg.roomTour?.date}</S.RoomTourDate>
															<S.RoomTourTime>시간 : {msg.roomTour?.time}</S.RoomTourTime>
															<S.RoomTourButtonWrapper>
																<Square text="자세히보기" onClick={()=>{
																	openContract("sent", "roomtour", true)
																}} status={true} width="100%" />
															</S.RoomTourButtonWrapper>
														</S.RoomTourContent>
													</S.RoomTourBubble>
												)
											) : (
												msg.contract ? (
													<S.ContractBubble style={{marginRight: 'auto'}}>
														<Image
															src={msg.contract.thumbnail || '/assets/meeting/profile.png'}
															alt="contract-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.ContractContent>
															<S.ContractTitle>계약이 완료되었어요</S.ContractTitle>
															<S.ContractHouse>{msg.contract.name}</S.ContractHouse>
															<S.ContractButtonWrapper>
															<Square text="자세히보기" onClick={()=>{
																openContract("received", "contract", true)
																}} status={true} width="100%" />
															</S.ContractButtonWrapper>
														</S.ContractContent>
													</S.ContractBubble>
												) : (
													<S.RoomTourBubble style={{marginRight: 'auto'}}>
														<Image
															src={msg.roomTour?.thumbnail || '/assets/meeting/profile.png'}
															alt="roomtour-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.RoomTourContent>
															<S.RoomTourTitle>룸투어를 예약했어요</S.RoomTourTitle>
															<S.RoomTourHouse>{msg.roomTour?.name}</S.RoomTourHouse>
															<S.RoomTourDate>날짜 : {msg.roomTour?.date}</S.RoomTourDate>
															<S.RoomTourTime>시간 : {msg.roomTour?.time}</S.RoomTourTime>
															<S.RoomTourButtonWrapper>
																<Square text="자세히보기" onClick={()=>{
																	openContract("received", "roomtour", true)
																}} status={true} width="100%" />
															</S.RoomTourButtonWrapper>
														</S.RoomTourContent>
													</S.RoomTourBubble>
												)
											)
										) : (
											<>
												{/* 이미지 메시지 버블 */}
												{msg.text === "" && msg.img ? (
													<S.ReceivedMsgBubble style={{padding: 0, background: 'none'}}>
														<Image
															width={1000}
															height={1000}
															src={msg.img}
															alt="img-msg"
															style={{
																objectFit: 'cover',
																borderRadius: '1rem',
																maxWidth: '320px',
																maxHeight: '320px',
																height: 'auto',
																width: 'auto',
																display: 'block'
															}}
														/>
													</S.ReceivedMsgBubble>
												) : (
													<S.ReceivedMsgBubble>
														<S.MsgText>{msg.text}</S.MsgText>
													</S.ReceivedMsgBubble>
												)}
												{/* 답장 미리보기 (상대방) */}
												{msg.replyTo && (
													<S.ReplyBubbleWrapper type="received">
														<S.ReplyBox style={{justifyContent: 'flex-start'}}>
															<S.ReplyBubbleName>{msg.replyTo.name}님에게 답장</S.ReplyBubbleName>
															<S.ReplyBubbleIcon>
																<Image src={Reply} width={20} height={20} alt="reply" />
															</S.ReplyBubbleIcon>
														</S.ReplyBox>
														<S.ReplyBubble type="received">
															<S.ReplyBubbleText type="received">{msg.replyTo.text}</S.ReplyBubbleText>
														</S.ReplyBubble>
													</S.ReplyBubbleWrapper>
												)}
											</>
										)}
										{/* hover 시 나타나는 아이콘 */}
										<S.MsgHoverIcons className="msg-hover-icons" isLastOfTime={isLastOfTime}>
											<Image src={Reply} width={20} height={20} alt="reply" style={{cursor:'pointer'}} onClick={() => setReplyInfo({name: msg.name || '', text: msg.text})} />
											<Image src={Heart} width={20} height={20} alt="heart" />
										</S.MsgHoverIcons>
										{isLastOfTime && <S.MsgTime>{msg.time}</S.MsgTime>}
									</S.ReceivedMsgAndTimeWrapper>
								</S.ReceivedMsgRow>
							) : (
								<S.SentMsgRow>
									<S.SentMsgAndTimeWrapper isHaveReply={msg.replyTo?.text}>
										{msg.text === "" && (msg.contract || msg.roomTour) ? (
											msg.type === 'sent' ? (
												msg.contract ? (
													<S.ContractBubble style={{marginLeft: 'auto'}}>
														<Image
															src={msg.contract.thumbnail || '/assets/meeting/profile.png'}
															alt="contract-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.ContractContent>
															<S.ContractTitle>계약이 완료되었어요</S.ContractTitle>
															<S.ContractHouse>{msg.contract.name}</S.ContractHouse>
															<S.ContractButtonWrapper>
															<Square text="자세히보기" onClick={()=>{
																	openContract("sent", "contract", false)
																}} status={true} width="100%" />
															</S.ContractButtonWrapper>
														</S.ContractContent>
													</S.ContractBubble>
												) : (
													<S.RoomTourBubble style={{marginLeft: 'auto'}}>
														<Image
															src={msg.roomTour?.thumbnail || '/assets/meeting/profile.png'}
															alt="roomtour-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.RoomTourContent>
															<S.RoomTourTitle>룸투어를 예약했어요</S.RoomTourTitle>
															<S.RoomTourHouse>{msg.roomTour?.name}</S.RoomTourHouse>
															<S.RoomTourDate>날짜 : {msg.roomTour?.date}</S.RoomTourDate>
															<S.RoomTourTime>시간 : {msg.roomTour?.time}</S.RoomTourTime>
															<S.RoomTourButtonWrapper>
																<Square text="자세히보기" onClick={()=>{
																	openContract("sent", "roomtour", false)
																}} status={true} width="100%" />
															</S.RoomTourButtonWrapper>
														</S.RoomTourContent>
													</S.RoomTourBubble>
												)
											) : (
												msg.contract ? (
													<S.ContractBubble style={{marginRight: 'auto'}}>
														<Image
															src={msg.contract.thumbnail || '/assets/meeting/profile.png'}
															alt="contract-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.ContractContent>
															<S.ContractTitle>계약이 완료되었어요</S.ContractTitle>
															<S.ContractHouse>{msg.contract.name}</S.ContractHouse>
															<S.ContractButtonWrapper>
															<Square text="자세히보기" onClick={()=>{
																	openContract("received", "contract", false)
																}} status={true} width="100%" />
															</S.ContractButtonWrapper>
														</S.ContractContent>
													</S.ContractBubble>
												) : (
													<S.RoomTourBubble style={{marginRight: 'auto'}}>
														<Image
															src={msg.roomTour?.thumbnail || '/assets/meeting/profile.png'}
															alt="roomtour-img"
															width={1000}
															height={180}
															style={{
																width: '100%',
																objectFit: 'cover',
																borderRadius: '1.1rem 1.1rem 0 0'
															}}
														/>
														<S.RoomTourContent>
															<S.RoomTourTitle>룸투어를 예약했어요</S.RoomTourTitle>
															<S.RoomTourHouse>{msg.roomTour?.name}</S.RoomTourHouse>
															<S.RoomTourDate>날짜 : {msg.roomTour?.date}</S.RoomTourDate>
															<S.RoomTourTime>시간 : {msg.roomTour?.time}</S.RoomTourTime>
															<S.RoomTourButtonWrapper>
																<Square text="자세히보기" onClick={()=>{
																	openContract("received", "roomtour", false)
																}} status={true} width="100%" />
															</S.RoomTourButtonWrapper>
														</S.RoomTourContent>
													</S.RoomTourBubble>
												)
											)
										) : (
											<>
												{/* 이미지 메시지 버블 */}
												{msg.text === "" && msg.img ? (
													<S.SentMsgBubble style={{padding: 0, background: 'none'}}>
														<Image
															width={1000}
															height={1000}
															src={msg.img}
															alt="img-msg"
															style={{
																objectFit: 'cover',
																borderRadius: '1rem',
																maxWidth: '320px',
																maxHeight: '320px',
																height: 'auto',
																width: 'auto',
																display: 'block'
															}}
														/>
													</S.SentMsgBubble>
												) : (
													<S.SentMsgBubble>
														<S.MsgText>{msg.text}</S.MsgText>
													</S.SentMsgBubble>
												)}
												{/* 답장 미리보기 (내 메시지) */}
												{msg.replyTo && (
													<S.ReplyBubbleWrapper type="sent">
														<S.ReplyBox>
															<S.ReplyBubbleIcon>
																<Image src={Reply} width={20} height={20} alt="reply" />
															</S.ReplyBubbleIcon>
															<S.ReplyBubbleName>{msg.replyTo.name}님에게 답장</S.ReplyBubbleName>
														</S.ReplyBox>
														<S.ReplyBubble type="sent">
															<S.ReplyBubbleText type="sent">{msg.replyTo.text}</S.ReplyBubbleText>
														</S.ReplyBubble>
													</S.ReplyBubbleWrapper>
												)}
											</>
										)}
										{isLastOfTime && <S.MsgTime>{msg.time}</S.MsgTime>}
									</S.SentMsgAndTimeWrapper>
								</S.SentMsgRow>
							)}
						</div>
					)
				})}
			</S.MessageContentContainer>
		</div>
	)
}