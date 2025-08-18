"use client";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Alert from "@/assets/icon/alert.svg"
import Home from "@/assets/icon/house.svg"
import Message from "@/assets/icon/message.svg"
import * as S from "./style";
import NProgress from "nprogress";
import {useUserStore} from "@/store/user";
import Login from "../login";
import LoginModal from "@/components/layout/loginModal";
import {useLoginModalStore} from "@/store/loginModal";
import {useQuery} from "@apollo/client";
import {AlertQueries} from "@/services/alert";

export default function Navigate() {
	const router = useRouter();
	const pathname = usePathname();
	const {id} = useUserStore();
	const {isOpen, open} = useLoginModalStore();
	const navigateClick = (path: string) => {
		NProgress.start()
		router.push(path);
	}
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
			onClick: () => navigateClick("/register"),
		},
	] as const
	
	const {data} = useQuery(AlertQueries.GET_ALERT_COUNT);
	return (
		<S.NavigateContainer>
			<S.Logo onClick={() => navigateClick("/")}>
				<Image
					src={"/logo.svg"}
					alt="로고"
					fill
					priority
				/>
			</S.Logo>
			<S.BtnBox>
				{id ? NAVIGATE_ITEMS.map(item => {
					return (
						<S.NavigateBtn
							key={item.path}
							isActive={pathname === item.path}
							onClick={() => navigateClick(item.path)}
							role="button"
							aria-label={item.aria_label}
							aria-current={item.active}
						>
							<S.IconBox>
								<Image src={item.icon} alt={item.label} width={32} height={32}/>
								{item.label === "알림" && data.alertCount > 0 && <S.Count>{data.alertCount}</S.Count>}
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
	)
}