import {mq} from "@/styles/media";
import styled from "@emotion/styled";

export const MetingPostContainer = styled.div`
  width: calc(100% - 10rem);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  ${mq.mobile} {
    width: calc(100% - 2rem);
    gap: 0.25rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`