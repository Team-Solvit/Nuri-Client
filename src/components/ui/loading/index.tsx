// "use client"
//
// import styled from "@emotion/styled";
// import {useLoadingStore} from "@/store/loading";
// import {createPortal} from "react-dom";
//
//
// export default function Loading() {
// 	const {isVisible} = useLoadingStore()
//
// 	if (!isVisible) return null;
// 	return (
// 		createPortal(
// 			<LoadingContainer>
// 				<Wrap>
// 					<video autoPlay loop muted playsInline src={"/loading.webm"}></video>
// 				</Wrap>
// 			</LoadingContainer>,
// 			document.body
// 		)
// 	)
// }
//
// const LoadingContainer = styled.div`
//   width: 150px;
//   height: 150px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 300000;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
// const Wrap = styled.div`
//   width: 150px;
//   height: 150px;
//   background: white;
//   border-radius: 50%;
//   overflow: hidden;
//   display: flex;
//   box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
//   justify-content: center;
//   align-items: center;
//
//   & > video {
//     width: 200%;
//     height: 200%;
//     object-fit: cover;
//   }
// `
"use client"

import {createPortal} from 'react-dom'
import styled from '@emotion/styled'
import {useLoadingStore} from '@/store/loading'
import {colors} from "@/styles/theme";
import {keyframes} from "@emotion/react";

export default function Loading() {
	const {isVisible} = useLoadingStore()
	
	if (!isVisible) return null
	return createPortal(
		<LoadingContainer>
			<Spinner/>
		</LoadingContainer>,
		document.body
	)
}

const LoadingContainer = styled.div`
  width: 150px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300000;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 회전 애니메이션 정의
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
