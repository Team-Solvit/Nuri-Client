'use client';
import * as S from "./style";
import {useModalStore} from "@/store/modal";

export default function Modal({children}: {children: React.ReactNode}) {
	const { close, isOpen} = useModalStore();
	if(!isOpen) return null
	return (
		<S.Black onClick={close}>
			<S.Content onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>
	);
}