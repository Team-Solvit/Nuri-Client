"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Alert from "@/assets/icon/alert.svg"
import Home from "@/assets/icon/house.svg"
import Message from "@/assets/icon/message.svg"
import * as S from "./style";
import { useUserStore } from "@/store/user";
import { useLoginModalStore } from "@/store/loginModal";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { AlertQueries } from "@/services/alert";
import { MessageQueries } from "@/services/message";
import { useQuery } from "@apollo/client";

const HOST_CARD_HIDDEN_KEY = "host_card_hidden";

export default function Navigate() {
	const navigate = useNavigationWithProgress();

	const pathname = usePathname();
	const { id, role } = useUserStore();
	const { open } = useLoginModalStore();
	const isHome = pathname === "/";
	const NAVIGATE_ITEMS = [
		{
			label: "알림",
			path: "/alert",
			icon: Alert,
			count: 1,
			active: pathname === "/alert" ? "page" : undefined,
			aria_label: "알림 페이지로 이동"
		},
		{
			label: "메시지",
			path: "/message",
			icon: Message,
			count: 1,
			active: pathname === "/message" ? "page" : undefined,
			aria_label: "메세지 페이지로 이동"
		},
		{
			label: "하숙집",
			path: "/myHouse",
			icon: Home,
			count: 1,
			active: pathname === "/myHouse" ? "page" : undefined,
			aria_label: "하숙집 페이지로 이동"
		},
	] as const

	const NAVIGATE_AUTH_ITEMS = [
		{
			label: "로그인",
			onClick: () => open(),
		},
		{
			label: "또는",
			onClick: () => {
			}
		},
		{
			label: "회원가입",
			onClick: () => navigate("/register"),
		},
	] as const

	const [alertCount, setAlertCount] = useState<number>(0);
	const [messageCount, setMessageCount] = useState<number>(0);
	const [showHostCard, setShowHostCard] = useState<boolean>(false);
	
	// 로컬스토리지에서 다시 보지 않기 상태 확인
	useEffect(() => {
		if (typeof window !== "undefined") {
			const hidden = localStorage.getItem(HOST_CARD_HIDDEN_KEY);
			setShowHostCard(!hidden);
		}
	}, []);
	
	const { data: alertData, refetch: refetchAlert } = useQuery<{ getNotificationCount: number }>(AlertQueries.GET_ALERT_COUNT, {
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
		skip: !id,
	});
	
	const { data: messageData, refetch: refetchMessage } = useQuery<{ getNewMessageCount: number }>(MessageQueries.GET_NEW_MESSAGE_COUNT, {
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
		skip: !id,
	});

	useEffect(() => {
		setAlertCount(Number(alertData?.getNotificationCount ?? 0));
	}, [alertData]);
	
	useEffect(() => {
		setMessageCount(Number(messageData?.getNewMessageCount ?? 0));
	}, [messageData]);

	useEffect(() => {
		if (!id) {
			setAlertCount(0);
			setMessageCount(0);
			return;
		}
		const onFocus = () => {
			if (typeof refetchAlert === "function") {
				try { refetchAlert(); } catch { }
			}
			if (typeof refetchMessage === "function") {
				try { refetchMessage(); } catch { }
			}
		};
		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	}, [id, refetchAlert, refetchMessage]);

	const handleCloseHostCard = () => {
		setShowHostCard(false);
	};

	const handleNeverShowAgain = () => {
		if (typeof window !== "undefined") {
			localStorage.setItem(HOST_CARD_HIDDEN_KEY, "true");
		}
		setShowHostCard(false);
	};

	return (
		<S.NavigateCon>
			<S.NavigateContainer>
				<S.Logo onClick={() => navigate("/")}>
					<Image
						src={"/logo.svg"}
						alt="로고"
						fill
						priority
					/>
				</S.Logo>
				<S.BtnBox>
					{id ? NAVIGATE_ITEMS.map(item => {
						if (role !== "HOST" && item.label === "하숙집") return null
						return (
							<S.NavigateBtn
								key={item.path}
								isActive={pathname === item.path}
								onClick={() => navigate(item.path)}
								role="button"
								aria-label={item.aria_label}
								aria-current={item.active}
							>
							<S.IconBox>
								<Image src={item.icon} alt={item.label} width={32} height={32} />
								{/* 알림 아이템일 때만, 경로가 /alert가 아니면 표시 */}
								{item.label === "알림" && alertCount > 0 && pathname !== "/alert" && (
									<S.Count>{alertCount > 99 ? "99+" : alertCount}</S.Count>
								)}
								{/* 메시지 아이템일 때만, 경로가 /message가 아니면 표시 */}
								{item.label === "메시지" && messageCount > 0 && pathname !== "/message" && (
									<S.Count>{messageCount > 99 ? "99+" : messageCount}</S.Count>
								)}
							</S.IconBox>
								<p>{item.label}</p>
							</S.NavigateBtn>
						)
					}) : NAVIGATE_AUTH_ITEMS.map(item => {
						if (item.label === "또는") {
							return (
								<S.Or key={item.label}>
									<S.Line
										onClick={item.onClick}
									/>
									<p>{item.label}</p>
									<S.Line
										onClick={item.onClick}
									/>
								</S.Or>

							)
						}
						return (
							<S.TextBtn
								key={item.label}
								onClick={item.onClick}
							>
								{item.label}
							</S.TextBtn>
						)
					})}
				</S.BtnBox>
			</S.NavigateContainer>
			{isHome && role === "USER" && showHostCard && (
				<S.HostCard>
					<S.HostCardHeader>
						<S.CloseButton onClick={handleCloseHostCard}>✕</S.CloseButton>
					</S.HostCardHeader>
					<S.HostTextBox>
						<strong>하숙집</strong>
						<strong>호스트라면?</strong>
						<span>간편하게 하숙 정보를 등록하고 관리해보세요</span>
					</S.HostTextBox>
					<S.HostCardActions>
						<S.HostCTAButton onClick={() => navigate("/setting/host")}>
							하숙집 설정하기
						</S.HostCTAButton>
						<S.NeverShowButton onClick={handleNeverShowAgain}>
							다시 보지 않기
						</S.NeverShowButton>
					</S.HostCardActions>
				</S.HostCard>
			)}
		</S.NavigateCon>
	)
}
