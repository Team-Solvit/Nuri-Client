"use client";

import {useMessageAlertStore} from "@/store/messageAlert";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import * as S from "./style";
import Image from "next/image";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {imageCheck} from "@/utils/imageCheck";
import {messageRequestCheck} from "@/utils/messageRequestCheck";


export default function MessageAlert() {
	const {
		isStatus,
		isVisible,
		isLeavingAnimation,
		setIsLeavingAnimation,
		none,
		ima_url,
		user_id,
		chat_id,
		content
	} = useMessageAlertStore();
	
	const navigate = useNavigationWithProgress();
	const navigateClick = (url: string) => {
		navigate(url)
		closeAlert();
	}
	useEffect(() => {
		const leavingTimer = setTimeout(() => {
			setIsLeavingAnimation(false);
		}, 2_800);
		const visibleTimer = setTimeout(() => {
			none();
		}, 3_500);
		return () => {
			clearTimeout(leavingTimer);
			clearTimeout(visibleTimer);
		};
	}, [isStatus]);
	
	const closeAlert = () => {
		setIsLeavingAnimation(false);
		setTimeout(() => {
			none();
		}, 500)
	}
	if (!isVisible && isStatus === "none") return null;
	
	const path = window.location.pathname;
	const isMessage = path.includes("/message");
	const ContractOrRoomTour = messageRequestCheck(content)
	const regex = /^https:\/\/cdn\.solvit-nuri\.com\/file\/[0-9a-fA-F-]{36}$/;
	if (isMessage) return null;
	
	return (
		createPortal(
			<S.Alert
				onClick={() => navigateClick(`/message/${chat_id}`)}
				isLeaving={!isLeavingAnimation}
			>
				<S.Content>
					<S.ImgBox>
						<Image style={{objectFit: "cover"}} src={imageCheck(ima_url || "")} alt="profile-img" fill/>
					</S.ImgBox>
					<S.TextBox>
						<S.Name>{user_id}</S.Name>
						<S.Message>
							{
								regex.test(content) ?
									"이미지"
									: ContractOrRoomTour ?
									ContractOrRoomTour.type==="roomTour" ?
										"룸투어 요청이 도착했어요!"
										: "계약 요청이 도착했어요!"
										: content
							}
						</S.Message>
					</S.TextBox>
				</S.Content>
			</S.Alert>,
			document.body
		)
	);
}