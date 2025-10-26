import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { mq } from '@/styles/media';

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 500px;
  max-height: 80vh;
  overflow-y: auto;

  ${mq.mobile} {
    min-width: unset;
    width: 100%;
    padding: 20px;
    max-height: 90vh;
  }
`;

const Title = styled(SkeletonBase)`
  width: 120px;
  height: 28px;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled(SkeletonBase)`
  width: 140px;
  height: 24px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: #f9f9f9;
  margin-bottom: 12px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
  }
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${mq.mobile} {
    width: 100%;
  }
`;

const Avatar = styled(SkeletonBase)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const Name = styled(SkeletonBase)`
  width: 120px;
  height: 20px;
  border-radius: 4px;

  ${mq.mobile} {
    max-width: 100%;
  }
`;

const Desc = styled(SkeletonBase)`
  width: 180px;
  height: 16px;
  border-radius: 4px;

  ${mq.mobile} {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  ${mq.mobile} {
    width: 100%;
  }
`;

const Button = styled(SkeletonBase)`
  width: 60px;
  height: 36px;
  border-radius: 6px;

  ${mq.mobile} {
    flex: 1;
  }
`;

const SingleButton = styled(SkeletonBase)`
  width: 60px;
  height: 36px;
  border-radius: 6px;

  ${mq.mobile} {
    width: 100%;
  }
`;

const FooterButton = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  margin-top: 12px;
`;

export default function MemberModalSkeleton() {
  return (
    <Wrapper>
      <Title />
      
      <Section>
        <SectionTitle />
        {[1, 2].map((i) => (
          <Card key={`request-${i}`}>
            <CardLeft>
              <Avatar />
              <Info>
                <Name />
                <Desc />
              </Info>
            </CardLeft>
            <ButtonGroup>
              <Button />
              <Button />
            </ButtonGroup>
          </Card>
        ))}
      </Section>

      <Section>
        <SectionTitle />
        {[1, 2, 3].map((i) => (
          <Card key={`member-${i}`}>
            <CardLeft>
              <Avatar />
              <Info>
                <Name />
                <Desc />
              </Info>
            </CardLeft>
            <SingleButton />
          </Card>
        ))}
      </Section>

      <FooterButton />
    </Wrapper>
  );
}
