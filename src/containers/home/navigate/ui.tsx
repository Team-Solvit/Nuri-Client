"use client";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Alert from "@/assets/icon/alert.svg"
import Home from "@/assets/icon/house.svg"
import Message from "@/assets/icon/message.svg"
import * as S from "./style";

export default function Navigate() {
	const router = useRouter();
	const navigateClick = (path: string) => {
		router.push(path);
	}
	return (
		<S.NavigateContainer>
			<S.NavigateBtn onClick={() => navigateClick("/alert")}>
				<S.IconBox>
					<Image src={Alert} alt="alert" width={32} height={32}/>
					{/*<S.Count>1</S.Count>*/}
				</S.IconBox>
				<p>알림</p>
			</S.NavigateBtn>
			<S.NavigateBtn onClick={() => navigateClick("/message")}>
				<S.IconBox>
					<Image src={Message} alt="message" width={32} height={32}/>
				</S.IconBox>
				<p>메세지</p>
			</S.NavigateBtn>
			<S.NavigateBtn onClick={() => navigateClick("/myHouse")}>
				<S.IconBox>
					<Image src={Home} alt="home" width={32} height={32}/>
				</S.IconBox>
				<p>하숙집</p>
			</S.NavigateBtn>
		</S.NavigateContainer>
	)
}