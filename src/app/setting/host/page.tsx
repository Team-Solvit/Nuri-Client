'use client'

import React from "react";
import * as S from "./style";
import SettingNav from "@/components/ui/settingNav";
import Logout from "@/components/ui/logout";
import { useState } from "react";

export default function Host() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log('로그아웃 처리 완료')
    setShowLogoutModal(false)
  }
  return (
    <S.Con>
      <SettingNav onLogoutClick={() => setShowLogoutModal(true)} />
      <S.Container>
        <S.Title>호스트 설정</S.Title>

        <S.Section>
          <S.SectionTitle>하숙집 정보</S.SectionTitle>
          <S.Home>
            <S.InputRow>
              <S.Input placeholder="하숙집 이름을 입력해주세요." />
              <S.Input placeholder="전화번호를 입력해주세요." />
            </S.InputRow>
            <S.InputRow>
              <S.Input placeholder="하숙집 소개를 입력해주세요." />
              <S.Input placeholder="하숙집 위치를 입력해주세요" />
            </S.InputRow>
          </S.Home>
          <S.Guide>* 하숙집 위치는 동까지만 작성해주세요. </S.Guide>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지역</S.SectionTitle>
          <S.InputRow>
            <S.Input placeholder="가까운 역을 모두 입력해주세요." />
            <S.Input placeholder="가까운 학교를 모두 입력해주세요" />
          </S.InputRow>
        </S.Section>

        <S.Section>
          <S.SectionTitle>성별 조건</S.SectionTitle>
          <S.RadioRow>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" defaultChecked />
              남
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" />
              여
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="gender" type="radio" />
              모두
            </S.RadioLabel>
          </S.RadioRow>
        </S.Section>

        <S.Section>
          <S.SectionTitle>식사 제공</S.SectionTitle>
          <S.RadioRow>
            <S.RadioLabel>
              <S.Radio name="meal" type="radio" defaultChecked />
              예
            </S.RadioLabel>
            <S.RadioLabel>
              <S.Radio name="meal" type="radio" />
              아니요
            </S.RadioLabel>
          </S.RadioRow>
        </S.Section>
      </S.Container>
      {showLogoutModal && <Logout
        onLogout={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />}
    </S.Con>
  );
}