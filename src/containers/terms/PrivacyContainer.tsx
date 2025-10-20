"use client";

import * as S from './style';

export default function PrivacyContainer() {
  return (
    <S.Page>
      <S.Title>개인정보 수집·이용 동의</S.Title>
      <S.Effective>시행일: 2025-09-11</S.Effective>

      <S.Section>
        <S.SectionTitle>수집 항목</S.SectionTitle>
        <S.List>
          <li><strong>필수 항목</strong>: 이름, 이메일, 국적, 언어</li>
          <li><strong>자동 수집 항목</strong>: 서비스 이용 기록, 접속 로그, 쿠키, IP 정보</li>
          <li><strong>추가 수집 항목(특별 인증 시)</strong>: 거주지 주소, 연락처, 하숙 관련 정보</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>수집 목적</S.SectionTitle>
        <S.List>
          <li>회원 가입 및 기본 서비스 제공</li>
          <li>사용자 식별 및 이용자 관리</li>
          <li>다국어 지원 및 국적 기반 맞춤형 서비스 제공</li>
          <li>(추가 수집 시) 하숙 관리, 모임 운영, 재단 연계 서비스 지원</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>보유 및 이용 기간</S.SectionTitle>
        <p>회원 탈퇴 시 즉시 파기합니다. 단, 전자상거래법, 통신비밀보호법 등 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간까지 보관합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>동의 거부 권리 및 불이익 안내</S.SectionTitle>
        <p>이용자는 개인정보 수집·이용 동의를 거부할 권리가 있습니다. 다만 필수 항목에 동의하지 않으면 회원가입이 불가하며, 추가 항목에 동의하지 않으면 해당 기능(하숙/모임 인증 등) 이용이 제한될 수 있습니다.</p>
      </S.Section>
    </S.Page>
  );
}
