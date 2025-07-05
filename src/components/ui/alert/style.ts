import styled from "@emotion/styled";
import {zIndex, radius, fontSizes} from "@/styles/theme";
import { keyframes, css } from '@emotion/react';

interface Status {
	success: boolean;
}
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const shrink = keyframes`
  from {
    width: 20rem;
  }
  to {
    width: 0;
  }
`;
export const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;
export const Alert = styled.div<{ isLeaving: boolean }>`
	position: fixed;
    width: 20rem;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    padding: 1.25rem 0;
				top: 3rem;
				right: 3rem;
				z-index: ${zIndex.overlay};
				background-color: white;
				border-radius: ${radius.md};
    animation: ${({ isLeaving }) =>
            isLeaving
                    ? css`${fadeOutDown} 0.5s ease forwards`
                    : css`${fadeInUp} 0.5s ease forwards`};
`;
export const Content = styled.div`
				display: flex;
				gap: 0.5rem;
				position: relative;
				align-items: center;
`
export const Close = styled.div`
	position: absolute;
				top: 0;
				right: 1rem;
				cursor: pointer;
				width: 1rem;
				height: 1rem;
				& > img{
								width: 100%;
								height: 100%;
				}
`
export const Gauge = styled.div<Status>`
  height: 4px;
  background-color:
          ${(props) => props.success ? "#71DAAA" : "#E74B3C"};;
  border-radius: 2px;
  animation: ${shrink} 5s linear forwards;
				position: absolute;
				bottom: -1.25rem;
				left: 0;
`;
export const Emotion = styled.div<Status>`
				border-right: 0.05rem solid
				${(props) => props.success ? "#71DAAA" : "#FFEDEF"};
				height: 3rem;
				padding: 0 1.4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				& > img{
								width: 2.5rem;
				}
`
export const GageBox = styled.div`
		position: relative;
		
`
export const TextBox = styled.div<Status>`
	padding: 0 0.5rem;
				& > h3{
								font-size: ${fontSizes.H4};
								font-weight: 700;
								margin-bottom: 0.5rem;
								color: ${(props) => props.success ? "#71DAAA" : "#E74B3C"};;
				}
				& > p{
								font-size: ${fontSizes.Body};
								font-weight: 400;
				}
	
`

