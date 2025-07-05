import styled from "@emotion/styled";
import {zIndex, radius} from "@/styles/theme";

export const Black = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
	background-color: rgba(116, 116, 116, 0.5);
	z-index: ${zIndex.modal};
`
export const Content = styled.div`
	background-color: white;
				padding: 2rem 3rem;
				position: relative;
				border-radius: ${radius.md};
`
export const Close = styled.div`
				width: 2rem;
				height: 2rem;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 1rem;
				right: 1rem;
`