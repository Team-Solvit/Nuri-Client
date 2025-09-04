import styled from "@emotion/styled";
import {colors, radius, fontSizes} from '@/styles/theme';
import { mq } from '@/styles/media';


export const PostItem = styled.div`
  display: flex;
  padding: 12px;
  width: 73vw;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  background-color: ${colors.background};
  cursor: pointer;
  align-items: center;
  justify-content: space-between; /* 왼쪽(Post) / 오른쪽(Profile) */

  ${mq.mobile} {
    width: 87.5vw;
    height: 12vh;
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0; /* 줄어들지 않음 */
  /* width 제거 → 내용 크기에 맞게 딱 붙음 */
`


export const Post = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* 남는 공간 다 차지 */
  gap: 10px;
`

export const PostMain = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.gray};
  gap: 2px;
  flex: 1; /* 제목/지역/가격 영역도 가변 */

  ${mq.mobile} {
        width: 20vw;
    }
`

export const PostUser = styled.span`
    font-size: ${fontSizes.Body};

    ${mq.mobile} {
        font-size: ${fontSizes.Caption};
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

export const PostThumbnail = styled.div`
    flex-shrink: 0;
    width: 6vw;
    height: 9vh;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    ${mq.mobile} {
        width: 20vw;
        height: 8.5vh;
  }
`

export const PostTitle = styled.p`
    font-size: ${fontSizes.Body};
    font-weight: 500;
    color: ${colors.text};
    margin-bottom: 6px;

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
