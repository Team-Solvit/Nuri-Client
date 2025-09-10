"use client";

import * as S from './style';

export default function TosContainer() {
  return (
    <S.Page>
      <S.Title>서비스 이용약관</S.Title>
      <S.Effective>시행일: 2025-09-11</S.Effective>

      <S.Section>
        <S.SectionTitle>제1조 (목적)</S.SectionTitle>
        <p>본 약관은 “누리” 서비스 이용에 관한 회사와 회원 간 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제2조 (약관의 효력 및 변경)</S.SectionTitle>
        <p>본 약관은 서비스 내 게시 또는 공지함으로써 효력이 발생하며, 관련 법령 범위 내에서 변경될 수 있습니다. 중요한 변경은 시행 7일 전 공지합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제3조 (이용계약의 체결)</S.SectionTitle>
        <p>회원가입 절차를 완료하고 회사가 승낙함으로써 이용계약이 성립합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제4조 (회원의 의무)</S.SectionTitle>
        <S.List>
          <li>타인의 정보 도용 금지</li>
          <li>서비스 운영 방해 행위 금지</li>
          <li>지식재산권 등 타인의 권리 침해 금지</li>
          <li>관련 법령 및 약관 준수</li>
        </S.List>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제5조 (회사의 의무)</S.SectionTitle>
        <p>회사는 안정적인 서비스 제공을 위해 최선을 다하며, 개인정보 보호 관련 법령을 준수합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제6조 (서비스의 제공 및 변경)</S.SectionTitle>
        <p>서비스는 운영상·기술상 필요에 따라 내용이 변경될 수 있으며, 중요한 변경사항은 사전 공지합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제7조 (서비스의 중단)</S.SectionTitle>
        <p>점검, 장애, 기타 불가피한 사유로 서비스가 일시 중단될 수 있으며, 회사는 사전 또는 사후 공지합니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제8조 (계약 해지 및 이용제한)</S.SectionTitle>
        <p>회원은 언제든지 탈퇴할 수 있으며, 약관 위반 시 회사는 사전 통지 후 이용을 제한하거나 계약을 해지할 수 있습니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제9조 (책임의 제한)</S.SectionTitle>
        <p>천재지변 등 불가항력, 회원의 귀책사유, 회원 간 분쟁에 대하여 회사는 책임을 부담하지 않습니다.</p>
      </S.Section>

      <S.Section>
        <S.SectionTitle>제10조 (준거법 및 관할)</S.SectionTitle>
        <p>본 약관은 대한민국 법률에 따르며, 분쟁이 발생할 경우 관할법원을 제1심 법원으로 합니다.</p>
      </S.Section>
    </S.Page>
  );
}
