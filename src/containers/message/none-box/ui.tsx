import * as S from "./style";
import Image from "next/image";
import Sent from "@/assets/icon/sent.svg"

export default function NoneBox() {
	return (
		<S.NoneBoxContainer>
			<Image src={Sent} alt={"sent-icon"} width={100} height={100}/>
			<p>왼쪽에서 대화를 선택하거나 새 메시지를 시작해보세요</p>
		</S.NoneBoxContainer>
	)
}