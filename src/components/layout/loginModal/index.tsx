'use client';
import * as S from "./style";

import { useLoginModalStore } from "@/store/loginModal";
import {createPortal} from "react-dom";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginModal({children}: { children: React.ReactNode }) {
	const router = useRouter();
	const {close, isOpen} = useLoginModalStore();
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted || !isOpen) return null
	
	const closeModal = () => {
		close()
		router.push(window.location.pathname, {scroll: false});
	}
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Escape") {
			closeModal()
		}
	}
	return createPortal(
		<S.Black
			onClick={closeModal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			onKeyDown={(e) => handleKeyDown(e)}
			tabIndex={-1}
		>
			<S.Content onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>,
		document.body
	)
}