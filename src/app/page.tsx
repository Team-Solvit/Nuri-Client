'use client'

import Alert from "@/components/ui/alert";
import Modal from "@/components/layout/modal";
import {useModalStore} from "@/store/modal";

export default function Home() {
	const {open} = useModalStore();
  return (
			<>
				<Alert description={"hello"} success={true} />
				<button onClick={open}>modal</button>
				<Modal>
				<p>dddd</p>
			</Modal>
			</>
   
  )
}