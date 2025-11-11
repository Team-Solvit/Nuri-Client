import styled from "@emotion/styled";
import {colors, radius, fontSizes} from '@/styles/theme';
import { mq } from '@/styles/media';

export const PostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  width: 73vw;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  background-color: ${colors.background};
  cursor: pointer;

  ${mq.mobile} {
    width: 100%;
  }
`

export const PostMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`


export const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-shrink: 0;
`

export const PostUser = styled.span`
    font-size: ${fontSizes.Body};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;

    ${mq.mobile} {
        font-size: ${fontSizes.Caption};
        max-width: 60px;
    }
`

export const PostRegion = styled.span`
    font-size: 12px;
    color: ${colors.gray};

    ${mq.mobile} {
        font-size: ${fontSizes.Caption};
        margin-top: 0.5rem;
  }
`

export const Post = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
    min-width: 0;
`

export const PostThumbnail = styled.div`
    flex-shrink: 0;
    width: 10vw;
    height: 12vh;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    ${mq.mobile} {
        width: 28vw;
        height: 11vh;
  }
`

export const PostTitle = styled.p`
    font-size: ${fontSizes.Body};
    font-weight: 500;
    color: ${colors.text};
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${mq.mobile} {
        font-size: ${fontSizes.Caption};
  }
`

export const PostPrice = styled.div`
    color: ${colors.text};
    font-weight: 300;

    ${mq.mobile} {
        width: 33vw;
  }
`
