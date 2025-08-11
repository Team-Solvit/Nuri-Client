import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const Container = styled.aside`
    padding: 3rem;
    background-color: ${colors.background};
    border-right: 1px solid ${colors.line};
    border-left: 1px solid ${colors.line};
    width: 20vw;
    height: 100vh;

    ${mq.mobile} {
        width: 40vw;
    }
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Top = styled.div`
    display: flex;
    gap: 13rem;
`;

export const Title = styled.p`
    font-size: ${fontSizes.H4};
    font-weight: 400;
    white-space: nowrap;
`

export const Overlay = styled.div`
  ${mq.mobile} {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: flex-start; 
    z-index: 999;
  }
`

export const ModalWrapper = styled.div`
  ${mq.mobile} {
    background: white;
    width: 70%;
    max-width: 300px;
    height: 100%;
    padding: 1rem;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  }
`


export const SectionTitle = styled.div`
    font-size: ${fontSizes.Body};
    color: ${colors.gray};
    font-weight: 400;
    margin: 1.8rem 0 0.7rem;
`;

export const Button = styled.button`
    background-color: white;
    color: gray;
    border: none;
`;

export const MenuItem = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: ${fontSizes.Body};
    padding: 0.6rem 1rem;
    border-radius: ${radius.md};
    font-weight: ${({ active }) => (active ? '600' : 'normal')};
    color: ${({ active }) => (active ? colors.primary : colors.text)};
    background-color: ${({ active }) => (active ? `${colors.primary}1A` : 'transparent')};
    cursor: pointer;

    transition: 0.2s ease;

    &:hover {
    background: ${({ active }) => (active ? "rgb(255, 210, 215)" : "rgba(90, 90, 90, 0.03)")};
    }

    & > img {
        filter: ${({ active }) =>
        active
            ? 'invert(56%) sepia(50%) saturate(7496%) hue-rotate(328deg) brightness(107%) contrast(101%)'
            : 'none'};
    }
`;
