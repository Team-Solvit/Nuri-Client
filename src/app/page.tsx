'use client'

import Modal from "@/components/layout/modal"
import Login from "@/components/ui/login"
import { useModalStore } from "@/store/modal"

export default function Home() {
	const { isOpen, open } = useModalStore();
	return (
		<>
			<button onClick={open}>로그인</button>
			{isOpen && (
				<Modal>
					<Login />
				</Modal>
			)}
		</>
	)
}