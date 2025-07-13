'use client';
import * as S from "./style";
import { useModalStore } from "@/store/modal";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
	const { close, isOpen } = useModalStore();
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted || !isOpen) return null

	return createPortal(
		<S.Black onClick={close}>
			<S.Content onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>,
		document.body
	)
}