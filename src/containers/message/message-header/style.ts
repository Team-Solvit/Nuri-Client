import styled from "@emotion/styled";
import {fontSizes, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MessageHeaderContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 10%;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #DDDDDD;

  background-color: white;
  z-index: ${zIndex.overlay};

  ${mq.mobile} {
    position: fixed;
    top: 0;
    left: 0;
  }

  & > p {
    font-size: ${fontSizes.H4};
    font-weight: 500;
  }
`;
export const ProfileBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
`

export const MemberListContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 1rem;
  width: 280px;
  max-height: 360px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  z-index: ${zIndex.overlay};
  overflow: auto;
  padding: 8px 0;
`;

export const MemberListHeader = styled.div`
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
`;
