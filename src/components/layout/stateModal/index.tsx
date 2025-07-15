'use client';
import * as S from "./style";

export default function StateModal({ children, close, isOpen }: { children: React.ReactNode, close: () => void, isOpen: boolean }) {
	if (!isOpen) return null
	return (
		<S.Black onClick={close}>
			<S.Content onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>
	);
}