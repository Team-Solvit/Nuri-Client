import styled from "@emotion/styled";
import { colors, fontSizes, radius, zIndex } from '@/styles/theme';

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

export const ReceivedMsgRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 0.5rem;
`;

export const ProfileImg = styled.div<{ isFirst: boolean }>`
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: ${(props) => (props.isFirst ? "#e0e0e0" : "#ffffff")};
`;

export const ReceivedMsgBubble = styled.div`
  background: ${colors.line2};
  border-radius: 16px;
  padding: 12px 16px;
  max-width: 320px;
  font-size: ${fontSizes.Body};
  font-weight: 200;
  color: ${colors.text};
`;

export const SentMsgRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SentMsgBubble = styled.div`
  position: relative;
  background: ${colors.primary};
  border-radius: 16px;
  padding: 12px 16px;
  max-width: 320px;
  font-size: ${fontSizes.Body};
  z-index: ${zIndex.dropdown};
  font-weight: 200;
  color: #fff;
`;
export const ReplyBox = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
width: 100%;
`
export const MsgText = styled.div`
  word-break: break-all;
`;

export const MsgTime = styled.div`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
  font-weight: 300;
  margin-top: 2px;
  text-align: right;
`;

export const ReceivedMsgAndTimeWrapper = styled.div<{isHaveReply : string | undefined}>`
  ${(props)=>props.isHaveReply ? "margin-top:4rem;" : null}
  display: flex;
  align-items: flex-end;
  gap: 6px;
  position: relative;

  &:hover .msg-hover-icons {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const MsgHoverIcons = styled.div<{
  isLastOfTime?: boolean;
}>`
  position: absolute;
  bottom: 0;
  right: ${({isLastOfTime}) => isLastOfTime ? '-0.5rem' : '-4rem'};
  display: flex;
  gap: 0.5rem;
  background: ${colors.background};
  border-radius: ${radius.md};
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.06);
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s, right 0.15s;
  z-index: 2;
`;

export const SentMsgAndTimeWrapper = styled.div<{isHaveReply : string | undefined}>`
  display: flex;
  position: relative;
  align-items: flex-end;
  gap: 6px;
  flex-direction: row-reverse;
  ${(props)=>props.isHaveReply ? "margin-top:4rem;" : null}
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

export const ReplyBubbleWrapper = styled.div<{
  type: 'sent' | 'received';
}>`
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-bottom: 0.25rem;
  justify-content: ${({type}) => type === 'sent' ? 'flex-end' : 'flex-start'};
  gap: 0.5rem;
  position: absolute;
  top: -3.7rem;
  z-index: ${zIndex.base};
  ${({type})=> type === "sent" ? "right:0;" : "left: 0;"};
`;

export const ReplyBubble = styled.div<{
  type: 'sent' | 'received';
}>`
  background: ${colors.line2};
  border-radius: ${radius.lg};
  padding: 0.5rem 1rem;
  max-width: 220px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
`;

export const ReplyBubbleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

export const ReplyBubbleName = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

export const ReplyBubbleText = styled.div<{
  type: 'sent' | 'received';
}>`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  font-weight: 300;
  word-break: break-all;
`;

export const RoomTourBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid ${colors.line};
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RoomTourImage = styled.img`
  width: 100%;
  max-width: 288px;
  height: 180px;
  object-fit: cover;
  border-radius: 1.1rem 1.1rem 0 0;
`;

export const RoomTourTitle = styled.div`
  font-size: 1.25rem;
  color: ${colors.text};
  font-weight: 400;
  margin: 1.2rem 0 0.2rem 0;
`;

export const RoomTourHouse = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.2rem;
`;

export const RoomTourDate = styled.div`
  font-size: 0.75rem;
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

export const RoomTourTime = styled.div`
  font-size: 0.75rem;
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.8rem;
`;

export const RoomTourButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const RoomTourContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`

export const ContractBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid ${colors.line};
  max-width: 320px;
  width: 100%;
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContractContent = styled.div`
  width: 100%;
  padding: 0 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ContractTitle = styled.div`
  font-size: 1.25rem;
  color: ${colors.text};
  font-weight: 400;
  margin: 1.2rem 0 0.2rem 0;
`;

export const ContractHouse = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.8rem;
`;

export const ContractButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;