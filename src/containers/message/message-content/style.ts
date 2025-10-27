import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import {mq} from "@/styles/media";

export const ContainerBox = styled.section`
  width: 100%;
  height: 82%;
  position: relative;

  ${mq.mobile} {
    margin-top: 10vh;
  }
`
export const ProfileName = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 3.5rem;
  font-size: ${fontSizes.Body};
  font-weight: 500;
  color: ${colors.gray};
  z-index: 1;
`
export const MessageContentContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const DateDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.gray};
  font-size: ${fontSizes.Body};
  font-weight: 300;
  margin: 2.5rem 0 2rem 0;
  gap: 1rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${colors.line};
  }
`;

export const ReceivedMsgRow = styled.div<{ isSameUser: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  ${(props) => props.isSameUser ? "margin-bottom: 2rem;" : null}
`;

export const ProfileImg = styled.div<{ isFirst: boolean }>`
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: ${(props) => (props.isFirst ? "#e0e0e0" : "#ffffff")};

	& > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
  ${mq.mobile} {
    width: 30px;
    height: 30px;
  }
`;

export const SentMsgRow = styled.div<{ isSameUser: boolean }>`
  display: flex;
  justify-content: flex-end;
  ${(props) => props.isSameUser ? "margin-bottom: 2rem;" : null}
`;

export const ReceivedMsgAndTimeWrapper = styled.div<{ isHaveReply: boolean  }>`
  ${(props) => props.isHaveReply ? "margin-top:4rem;" : null}
  display: flex;
  align-items: flex-end;
  gap: 6px;
  position: relative;

  /* 메시지 바로 옆(오른쪽)에 아이콘이 나오도록, 부모에 여유 공간을 주지 않음(오버플로우 허용) */
  /* 부모 hover 시 아이콘을 보이게 하고 제자리로 이동시킴 */
  &:hover .msg-hover-icons {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
  }
`;

export const MsgHoverIcons = styled.div<{ isSent: boolean }>`
  position: absolute;
  top: 50%;
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  background: ${colors.background};
  border-radius: ${radius.md};
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.06);
  padding: 0.25rem 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.16s ease;
  z-index: 2;

  ${(props) =>
    props.isSent
      ? `
        right: 100%;
        transform: translate(8px, -50%);
      `
      : `
        left: 100%;
        transform: translate(-8px, -50%);
      `}

  /* 아이콘 자체에 hover 시 즉시 유지되도록 약간의 안정성 추가 */
   &:hover {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
   }
`;

export const SentMsgAndTimeWrapper = styled.div<{ isHaveReply: boolean | null }>`
  display: flex;
  position: relative;
  align-items: flex-end;
  gap: 6px;
  flex-direction: row-reverse;
  ${(props) => props.isHaveReply ? "margin-top:4rem;" : null}

  &:hover .msg-hover-icons {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
  }
`;

export const ReplyPreviewContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: -1rem;
  z-index: ${zIndex.overlay};
  background: ${colors.background};
  border: 1px solid ${colors.line};
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ReplyPreviewText = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  font-weight: 300;
`;

export const ReplyPreviewName = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
`;

export const ReplyPreviewCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const SystemMessage = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.gray};
  font-size: ${fontSizes.Body};
  font-weight: 400;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  background-color: ${colors.background};
  border-radius: ${radius.sm};
  line-height: 1.4;
`;
