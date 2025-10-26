import styled from "@emotion/styled";
import { zIndex, radius } from "@/styles/theme";
import { mq } from "@/styles/media";

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

  ${mq.mobile} {
    padding: 20px;
  }
`
export const Content = styled.div`
  background-color: white;
  position: relative;
  border-radius: ${radius.md};
  
  ${mq.mobile} {
    width: 100%;
  }
`