"use client";

import * as S from './style';

export default function ThirdPartyContainer() {
  return (
    <S.Page>
      <S.Title>개인정보 제3자 제공 동의</S.Title>
      <S.Effective>시행일: 2025-09-11</S.Effective>

      <S.Section>
        <S.SectionTitle>1. 제공받는 자</S.SectionTitle>
        <p>부산글로벌도시재단(예정)</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>2. 제공 항목</S.SectionTitle>
        <S.List>
          <li>이름, 이메일, 국적, 언어</li>
          <li>선택 기능 이용 시: 거주지, 하숙 정보, 모임 참여 내역</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>3. 제공 목적</S.SectionTitle>
        <p>하숙/안전 관리, 모임 운영 및 행정 지원</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>4. 보유 및 이용기간</S.SectionTitle>
        <p>제공 목적 달성 시까지 보유·이용하며, 관련 법령상 보관 의무는 예외로 합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>5. 동의 거부권 및 불이익</S.SectionTitle>
        <p>동의를 거부할 권리가 있으나, 필수 제공 항목에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.</p>
      </S.Section>
    </S.Page>
  );
}
