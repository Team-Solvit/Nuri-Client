import styled from "@emotion/styled";
import {zIndex} from "@/styles/theme";

export const BackMeetingRoomBtnContainer = styled.div`
	position: fixed;
	top: 8%;
	right: 0;
	transform: translateX(-80%);
	z-index: ${zIndex.dropdown};
	cursor: pointer;
	width: 3rem;
	height: 3rem;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
