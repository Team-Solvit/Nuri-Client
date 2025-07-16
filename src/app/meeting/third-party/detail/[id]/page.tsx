'use client'

import * as S from "./style";
import React from "react";
import MeetingThirdPartyDetailContainer from "@/containers/meeting/third-party/Detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default function MeetingThirdPartyDetail({ params }: Props) {
  const { id } = React.use(params);
  return (
    <S.Wrapper>
      <MeetingThirdPartyDetailContainer id={id} />
    </S.Wrapper>
  );
}