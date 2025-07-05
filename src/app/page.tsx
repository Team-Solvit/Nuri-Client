'use client'

import Alert from "@/components/ui/alert";
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";

export default function Home() {
	const {open} = useModalStore();
	return (
		<>
			<Alert
				description={"게시물 생성에 성공하였습니다! ㅁ니어ㅁ니ㅏ리ㅏㅁㅇ널ㅇ너ㅣㅏㅇ너리ㅏ너ㅏ너라ㅣ머라ㅣㅁㄴ어라ㅣㄴㅁ라ㅣㄴㅁ어림ㅇㄴ라ㅣㅇㄴ머ㅏ라리ㅏㅁ너리ㅏㅇㄴ머라ㅣㅁㄴ러ㅏㅣ너리ㅏㅁ널이ㅓ라ㅣㅓㅏㅣㅁ너dslakfjlkasjfslfkdjkf"}
				success={true}/>
			<button onClick={open}>modal</button>
			<Modal>
				<p>dddd</p>
			</Modal>
		</>
	
	)
}