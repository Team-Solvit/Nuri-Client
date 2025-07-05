'use client'

import Alert from "@/components/ui/alert";
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";
import Post from "@/components/ui/post/indext";

export default function Home() {
	const {open} = useModalStore();
	return (
		<div style={{ display: "flex"}}>
			<Alert
				description={"이제 어떤게 와도 가능함."}
				success={true}/>	
			<button onClick={open}>modal</button>
			<Modal>
				<p>dddd</p>
			</Modal>
		</div>
	
	)
}