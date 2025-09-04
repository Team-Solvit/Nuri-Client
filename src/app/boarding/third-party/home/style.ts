import { mq } from "@/styles/media";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
    padding: 8px 100px;
        position: relative;

    ${mq.mobile} {
        flex-direction: column;
        padding: 16px;
    }
`;

export const HeaderActions = styled.div`
    position: absolute;
    top: 16px;
    right: 100px;
    display: flex;
    gap: 0.75rem;
    ${mq.mobile} {
        position: static;
        align-self: flex-end;
        margin-bottom: 8px;
        right: auto;
        top: auto;
    }
`;