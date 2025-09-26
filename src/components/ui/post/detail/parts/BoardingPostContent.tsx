"use client";

import React from "react";
import Image from "next/image";
import * as S from "../style";
import { getFacilityIcon } from "@/utils/facilityIcons";

interface BoardingPostContentProps {
  isModal?: boolean;
  roomName?: string;
  headCount: number;
  location?: string;
  desc: string;
  monthlyRent?: number;
  periods: number[];
  nearestStation?: string;
  nearestSchool?: string;
  gender?: string;
  isMealProvided?: boolean;
  options: Array<{ optionId: string; name: string }>;
  showRoomTour?: boolean;
  onToggleRoomTour?: () => void;
  roomTourRef?: React.RefObject<HTMLDivElement>;
}

export default function BoardingPostContent({
  isModal,
  roomName,
  headCount,
  location,
  desc,
  monthlyRent,
  periods,
  nearestStation,
  nearestSchool,
  gender,
  isMealProvided,
  options,
  showRoomTour,
  onToggleRoomTour,
  roomTourRef,
}: BoardingPostContentProps) {
  return (
    <>
      <S.RightTopRow>
        <S.RightPeriodTags>
          {periods.map((p, Idx) => (
            <S.RightPeriodTag key={Idx}>{p}개월</S.RightPeriodTag>
          ))}
        </S.RightPeriodTags>
      </S.RightTopRow>
      <S.RightTitle>
        <span>{roomName}</span>
        <S.RightRoomType>{headCount}인실</S.RightRoomType>
      </S.RightTitle>
      <S.RightSub>{location}</S.RightSub>
      <S.RightDesc>{desc}</S.RightDesc>
      <S.RightDivider />
      <S.RightLabelRow>
        <S.RightLabel>요금</S.RightLabel>
        <S.RightPriceRow>
          <S.RightPriceUnit>월</S.RightPriceUnit>
          <S.RightPriceValue>₩ {monthlyRent?.toLocaleString()}</S.RightPriceValue>
        </S.RightPriceRow>
      </S.RightLabelRow>
      <S.RightDivider />
      <S.RightFeatureList>
        {nearestStation && (
          <S.RightFeature>
            <S.RightFeatureIcon>
              <Image src="/icons/post-detail/station.svg" alt="station" width={20} height={20} />
            </S.RightFeatureIcon>
            <S.RightFeatureContent>
              <S.RightFeatureTitle>{nearestStation}</S.RightFeatureTitle>
              <S.RightFeatureDesc>가까운 역</S.RightFeatureDesc>
            </S.RightFeatureContent>
          </S.RightFeature>
        )}
        {nearestSchool && (
          <S.RightFeature>
            <S.RightFeatureIcon>
              <Image src="/icons/post-detail/school.svg" alt="school" width={20} height={20} />
            </S.RightFeatureIcon>
            <S.RightFeatureContent>
              <S.RightFeatureTitle>{nearestSchool}</S.RightFeatureTitle>
              <S.RightFeatureDesc>가까운 학교</S.RightFeatureDesc>
            </S.RightFeatureContent>
          </S.RightFeature>
        )}
        {gender && (
          <S.RightFeature>
            <S.RightFeatureIcon>
              <Image
                src={gender === "MALE" ? "/icons/post-detail/gender-male.svg" : "/icons/post-detail/gender-female.svg"}
                alt={gender === "MALE" ? "male" : "female"}
                width={20}
                height={20}
              />
            </S.RightFeatureIcon>
            <S.RightFeatureContent>
              <S.RightFeatureTitle>{gender === "MALE" ? "남성전용" : gender === "FEMALE" ? "여성전용" : gender}</S.RightFeatureTitle>
              <S.RightFeatureDesc>성별 제한</S.RightFeatureDesc>
            </S.RightFeatureContent>
          </S.RightFeature>
        )}
        {isMealProvided && (
          <S.RightFeature>
            <S.RightFeatureIcon>
              <Image src="/icons/post-detail/meal.svg" alt="meal" width={20} height={20} />
            </S.RightFeatureIcon>
            <S.RightFeatureContent>
              <S.RightFeatureTitle>식사 제공</S.RightFeatureTitle>
              <S.RightFeatureDesc>식사 포함</S.RightFeatureDesc>
            </S.RightFeatureContent>
          </S.RightFeature>
        )}
      </S.RightFeatureList>
      <S.RightDivider />
      <S.RightLabel>시설</S.RightLabel>
      <S.RightFacilityGrid>
        {options.map((opt) => {
          const iconName = getFacilityIcon(opt.name);
          return (
            <S.RightFacility key={opt.optionId}>
              {iconName && (
                <S.RightFacilityIcon>
                  <Image src={`/icons/post-detail/${iconName}.svg`} alt={opt.name} width={32} height={32} />
                </S.RightFacilityIcon>
              )}
              <S.RightFacilityText>{opt.name}</S.RightFacilityText>
            </S.RightFacility>
          );
        })}
      </S.RightFacilityGrid>
    </>
  );
}
