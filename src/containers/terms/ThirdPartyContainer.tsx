"use client";

import * as S from './style';

export default function ThirdPartyContainer() {
  return (
    <S.Page>
      <S.Title>개인정보 제3자 제공 동의</S.Title>
      <S.Effective>시행일: 2025-09-11</S.Effective>

      <S.Section>
        <S.SectionTitle>제공받는 자</S.SectionTitle>
        <p>부산글로벌도시재단 (예정)</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제공 항목</S.SectionTitle>
        <S.List>
          <li>이름, 이메일, 국적, 언어</li>
          <li>(추가 인증 시) 거주지 주소, 하숙 관련 정보, 모임 참여 내역</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제공 목적</S.SectionTitle>
        <p>하숙 관리 및 안전 관리, 모임 활동 관리 및 재단 행정 지원</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>보유 및 이용 기간</S.SectionTitle>
        <p>제공 목적 달성 시까지 보관합니다. 단, 법령에 따라 별도로 보관이 필요한 경우 해당 기간까지 보관합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>동의 거부 권리 및 불이익 안내</S.SectionTitle>
        <p>이용자는 개인정보 제3자 제공에 동의하지 않을 권리가 있습니다. 다만 본 항목은 서비스 제공에 반드시 필요한 사항으로, 동의를 거부하면 회원가입 및 서비스 이용이 제한됩니다.</p>
      </S.Section>
    </S.Page>
  );
}
