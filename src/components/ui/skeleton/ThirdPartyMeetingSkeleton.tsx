import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { mq } from "@/styles/media";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  ${mq.mobile} {
    padding: 8px 4px;
    gap: 16px;
  }
`;

const HeaderSkeleton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 32px;
  width: 200px;

  ${mq.mobile} {
    height: 28px;
    width: 160px;
  }
`;

const SubtitleSkeleton = styled(SkeletonBase)`
  height: 20px;
  width: 150px;

  ${mq.mobile} {
    height: 18px;
    width: 120px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 10px;

  ${mq.mobile} {
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 40px;
  width: 100px;
  border-radius: 8px;

  ${mq.mobile} {
    height: 36px;
    width: 90px;
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitleSkeleton = styled(SkeletonBase)`
  height: 28px;
  width: 180px;

  ${mq.mobile} {
    height: 24px;
    width: 140px;
  }
`;

const MeetingCardSkeleton = styled.div`
  background: #fff;
  border: 1px solid #EAEAEA;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${mq.mobile} {
    padding: 16px;
    gap: 12px;
  }
`;

const MeetingTitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 200px;

  ${mq.mobile} {
    height: 20px;
    width: 150px;
  }
`;

const MeetingInfoRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const MeetingInfoSkeleton = styled(SkeletonBase)`
  height: 18px;
  width: 120px;

  ${mq.mobile} {
    height: 16px;
    width: 100px;
  }
`;

export default function ThirdPartyMeetingSkeleton() {
  return (
    <Wrapper>
      <HeaderSkeleton>
        <HeaderLeft>
          <TitleSkeleton />
          <SubtitleSkeleton />
        </HeaderLeft>
        <HeaderRight>
          <ButtonSkeleton />
          <ButtonSkeleton />
          <ButtonSkeleton />
        </HeaderRight>
      </HeaderSkeleton>

      <Section>
        <SectionTitleSkeleton />
        <MeetingCardSkeleton>
          <MeetingTitleSkeleton />
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
        </MeetingCardSkeleton>
        <MeetingCardSkeleton>
          <MeetingTitleSkeleton />
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
        </MeetingCardSkeleton>
      </Section>

      <Section>
        <SectionTitleSkeleton />
        <MeetingCardSkeleton>
          <MeetingTitleSkeleton />
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
          <MeetingInfoRow>
            <MeetingInfoSkeleton />
          </MeetingInfoRow>
        </MeetingCardSkeleton>
      </Section>
    </Wrapper>
  );
}
