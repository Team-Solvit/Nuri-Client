import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem 4rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq.mobile} {
    padding: 1rem;
  } 
`;