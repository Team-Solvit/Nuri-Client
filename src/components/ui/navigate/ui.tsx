"use client";
import React, { useEffect, useState } from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Alert from "@/assets/icon/alert.svg"
import Home from "@/assets/icon/house.svg"
import Message from "@/assets/icon/message.svg"
import * as S from "./style";
import {useUserStore} from "@/store/user";
import Login from "../login";
import LoginModal from "@/components/layout/loginModal";
import {useLoginModalStore} from "@/store/loginModal";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import { AlertQueries } from "@/services/alert";
import { useQuery } from "@apollo/client";

export default function Navigate() {
	const navigate = useNavigationWithProgress();
	
	const pathname = usePathname();
	const {id, role} = useUserStore();
	const {isOpen, open} = useLoginModalStore();
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
	const { data: alertData, refetch: refetchAlert } = useQuery(AlertQueries.GET_ALERT_COUNT, {
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
		skip: !id,
	});

	useEffect(() => {
		const count = (alertData?.getAlertCount?.count ?? alertData?.getAlertCount ?? alertData?.alertCount) || 0;
		setAlertCount(Number(count) || 0);
	}, [alertData]);

	useEffect(() => {
		if (!id) {
			setAlertCount(0);
			return;
		}
		const onFocus = () => {
			if (typeof refetchAlert === "function") {
				try { refetchAlert(); } catch (e) {
					console.error(e) }
			}
		};
		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	}, [id, refetchAlert]);
	
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
						if(role !== "HOST" && item.label === "하숙집") return null
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
									<Image src={item.icon} alt={item.label} width={32} height={32}/>
									{/* 알림 아이템일 때만, 경로가 /alert가 아니면 표시 */}
									{item.label === "알림" && alertCount > 0 && pathname !== "/alert" && (
										<S.Count>{alertCount > 99 ? "99+" : alertCount}</S.Count>
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
				{isOpen && (
					<LoginModal>
						<Login/>
					</LoginModal>
				)}
			</S.NavigateContainer>
			{isHome && role === "USER" && <S.HostCard>
        <S.HostTextBox>
          <strong>하숙집</strong>
          <strong>호스트라면?</strong>
          <span>간편하게 하숙 정보를 등록하고 관리해보세요</span>
        </S.HostTextBox>
        <S.HostCTAButton onClick={() => navigate("/setting/host")}>
          하숙집 설정하기
        </S.HostCTAButton>
      </S.HostCard>}
		</S.NavigateCon>
	)
}