import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import {mq} from "@/styles/media";

export const ContainerBox = styled.section`
  width: 100%;
  height: 100%;
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
    background: ${colors.line};
    opacity: 0.7;
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

export const ReceivedMsgAndTimeWrapper = styled.div<{ isHaveReply: string | undefined }>`
  ${(props) => props.isHaveReply ? "margin-top:4rem;" : null}
  display: flex;
  align-items: flex-end;
  gap: 6px;
  position: relative;

  &:hover .msg-hover-icons {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const MsgHoverIcons = styled.div`
  position: absolute;
  bottom: 0;
  right: -2.5rem;
  display: flex;
  gap: 0.5rem;
  background: ${colors.background};
  border-radius: ${radius.md};
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.06);
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s, right 0.15s;
  z-index: 2;
`;

export const SentMsgAndTimeWrapper = styled.div<{ isHaveReply: string | undefined }>`
  display: flex;
  position: relative;
  align-items: flex-end;
  gap: 6px;
  flex-direction: row-reverse;
  ${(props) => props.isHaveReply ? "margin-top:4rem;" : null}
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
