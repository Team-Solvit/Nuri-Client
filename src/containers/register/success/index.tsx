'use client'

import Square from "@/components/ui/button/square";
import { mq } from "@/styles/media";
import { colors, fontSizes } from "@/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";

const rocket = "/icons/rocket.svg";

export default function RegisterSuccessContainer() {
  return (
    <Wrapper>
      <Image src={rocket} alt="로켓" width={200} height={200} />
      <h1>회원가입 완료!</h1>
      <p>로그인을 통해 더 많은 서비스를 누려보세요!</p>
      <Square text="로그인 하러 가기" onClick={() => { }} status={true} width="100%" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;

  p {
    color: ${colors.gray};
    font-size: ${fontSizes.H4};
  }

  ${mq.mobile} {
    width: 100%;
  }
`;