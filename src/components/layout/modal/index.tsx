'use client';
import * as S from "./style";
import {useModalStore} from "@/store/modal";
import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Modal({children}: { children: React.ReactNode }) {
	const router = useRouter();
	const {close, isOpen} = useModalStore();
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted || !isOpen) return null
	
	const closeModal = () => {
		close()
		router.push(window.location.pathname, {scroll: false});
	}
	return createPortal(
		<S.Black onClick={closeModal}>
			<S.Content onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>,
		document.body
	)
}