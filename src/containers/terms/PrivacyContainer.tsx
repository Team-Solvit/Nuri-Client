"use client";

import * as S from './style';

export default function PrivacyContainer() {
  return (
    <S.Page>
      <S.Title>개인정보 수집·이용 동의</S.Title>
      <S.Effective>시행일: 2025-09-11</S.Effective>

      <S.Section>
        <S.SectionTitle>1. 수집 항목</S.SectionTitle>
        <S.List>
          <li>필수: 이름, 이메일, 국적, 언어</li>
          <li>자동수집: 이용 기록, 접속 로그, 쿠키, IP</li>
          <li>선택(기능 사용 시): 거주지, 연락처, 하숙/모임 정보</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>2. 수집 목적</S.SectionTitle>
        <S.List>
          <li>회원가입, 본인 식별, 사용자 관리</li>
          <li>국적·언어 기반 맞춤형 서비스 제공</li>
          <li>선택 기능 사용 시 하숙 관리, 모임 운영 지원</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>3. 보유 및 이용기간</S.SectionTitle>
        <p>회원 탈퇴 시 즉시 파기. 단, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>4. 동의 거부권 및 불이익</S.SectionTitle>
        <p>필수 항목 동의를 거부할 권리가 있으나, 이 경우 서비스 가입이 제한될 수 있습니다.</p>
      </S.Section>
    </S.Page>
  );
}
