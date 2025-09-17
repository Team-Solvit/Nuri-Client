import styled from "@emotion/styled";
import {colors, radius, fontSizes, zIndex} from "@/styles/theme";
import { mq } from "@/styles/media";

interface DropdownProps {
    selected?: boolean;
  }

export const Dropdown = styled.button<DropdownProps>`
    display: flex;
    padding: 10px 30px;
    color: ${({ selected }) => (selected ? colors.background : colors.gray)};
    border-radius: ${radius.xl};
    border: 1px solid ${colors.line};
    background-color: ${({ selected }) => (selected ? colors.primary : colors.background)};
    font-size: ${fontSizes.H4};
    align-items: center;
    gap: 7px;
    cursor: pointer;

    ${mq.mobile} {
        white-space: nowrap;
  }
`

export const DropdownContainer = styled.div`
    position: relative;
    //width: 200px;
`

export const Container = styled.div`
    position: absolute;
    top: 100%; 
    width: 15vw;
    max-height: 35vh;
    height: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.line};
    border-radius: ${radius.xl};
    padding: 15px;
    margin-top: 10px;
    z-index: ${zIndex.dropdown};
    background-color: ${colors.background};

    ${mq.mobile} {
        width: 45vw;
        height: auto;
    }
`

export const List = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 10px;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const Button = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding-top: 15px;
    border-top: 1px solid ${colors.line};
    background: ${colors.background};
    position: sticky;
    bottom: 0;
`
export const Input = styled.input`
    display: flex;
    padding: 12px 20px;
    border: none;
    outline: none;
    font-size: 18px;
    border: 1px solid ${colors.line};
    border-radius: ${radius.lg};

    &::placeholder {
        color: ${colors.gray};
        font-family: 'SCoreDream', sans-serif;
        font-size: ${fontSizes.Small};
    }
`

export const ListItem = styled.div<{ selected?: boolean }>`
    display: flex;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: ${radius.md};
    background-color: ${({ selected }) => (selected ? colors.primary : 'transparent')};
    color: ${({ selected }) => (selected ? colors.background : colors.text)};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ selected }) => (selected ? colors.primary : colors.gray + '20')};
    }
`