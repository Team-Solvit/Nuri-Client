import {mq} from "@/styles/media";
import styled from "@emotion/styled";

export const MetingPostContainer = styled.div<{ isModal: boolean }>`
  width: calc(100% - 10rem);
  display: grid;
  grid-template-columns: repeat(3, minmax(${props => props.isModal ? "220px" : "330px"}, 1fr));
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;

  ${mq.mobile} {
    width: calc(100% - 2rem);
    gap: 0.25rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	  max-width: 100px;
  }
`