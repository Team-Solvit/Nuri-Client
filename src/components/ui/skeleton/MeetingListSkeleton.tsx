import React from 'react';
import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { colors } from "@/styles/theme";
import { mq } from "@/styles/media";

const Wrapper = styled.div`
  width: 100%;
  max-height: 290px;
  overflow-y: auto;

  ${mq.mobile} {
    max-height: 320px;
  }
`;

const SectionTitle = styled(SkeletonBase)`
  height: 28px;
  width: 150px;
  margin-bottom: 18px;

  ${mq.mobile} {
    height: 24px;
    width: 120px;
    margin-bottom: 12px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`;

const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  padding: 32px;
  gap: 32px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 16px 20px;
    gap: 20px;
    border-radius: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;

  ${mq.mobile} {
    width: 100%;
    gap: 12px;
  }
`;

const MeetingTitleSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${mq.mobile} {
    gap: 6px;
  }
`;

const TitleSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 120px;

  ${mq.mobile} {
    height: 20px;
    width: 100px;
  }
`;

const SubtitleSkeleton = styled(SkeletonBase)`
  height: 18px;
  width: 150px;

  ${mq.mobile} {
    height: 16px;
    width: 130px;
  }
`;

const Divider = styled.span`
  width: 1px;
  align-self: stretch;
  background: ${colors.line};
  display: inline-block;

  ${mq.mobile} {
    display: none;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${mq.mobile} {
    gap: 6px;
  }
`;

const MetaItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconSkeleton = styled(SkeletonBase)`
  width: 16px;
  height: 16px;
  border-radius: 2px;
`;

const TextSkeleton = styled(SkeletonBase)`
  height: 16px;
  width: 100px;

  ${mq.mobile} {
    height: 14px;
    width: 80px;
  }
`;

const ButtonSkeleton = styled(SkeletonBase)`
  height: 40px;
  width: 100px;
  border-radius: 8px;

  ${mq.mobile} {
    width: 100%;
  }
`;

interface MeetingListSkeletonProps {
  count?: number;
}

export default function MeetingListSkeleton({ count = 2 }: MeetingListSkeletonProps) {
  return (
    <Wrapper>
      <SectionTitle />
      <List>
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index}>
            <Info>
              <MeetingTitleSkeleton>
                <TitleSkeleton />
                <SubtitleSkeleton />
              </MeetingTitleSkeleton>
              <Divider />
              <Meta>
                <MetaItemSkeleton>
                  <IconSkeleton />
                  <TextSkeleton />
                </MetaItemSkeleton>
                <MetaItemSkeleton>
                  <IconSkeleton />
                  <TextSkeleton />
                </MetaItemSkeleton>
              </Meta>
            </Info>
            <ButtonSkeleton />
          </Card>
        ))}
      </List>
    </Wrapper>
  );
}
