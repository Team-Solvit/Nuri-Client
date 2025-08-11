import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
    padding: 8px 100px;

    ${mq.mobile} {
        flex-direction: column;
        padding: 16px;
    }
`;