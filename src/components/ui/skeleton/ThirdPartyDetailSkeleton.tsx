import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { mq } from '@/styles/media';

const Wrapper = styled.div`
  padding: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;

  ${mq.mobile} {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 12px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled(SkeletonBase)`
  width: 200px;
  height: 32px;
  border-radius: 8px;

  ${mq.mobile} {
    width: 150px;
    height: 28px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  ${mq.mobile} {
    width: 100%;
  }
`;

const Button = styled(SkeletonBase)`
  width: 100px;
  height: 40px;
  border-radius: 8px;

  ${mq.mobile} {
    flex: 1;
  }
`;

const MainRow = styled.div`
  display: flex;
  gap: 40px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 24px;
  }
`;

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled(SkeletonBase)`
  width: 80px;
  height: 20px;
  border-radius: 4px;
`;

const Input = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
`;

const TimePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DateInput = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const AmPmGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const AmPmButton = styled(SkeletonBase)`
  width: 50px;
  height: 40px;
  border-radius: 8px;
`;

const TimeInput = styled(SkeletonBase)`
  width: 60px;
  height: 40px;
  border-radius: 8px;
`;

const Participants = styled.div`
  margin-top: 40px;
`;

const ParticipantsTitle = styled(SkeletonBase)`
  width: 120px;
  height: 24px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const ParticipantList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const ParticipantCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f5f5f5;
`;

const Avatar = styled(SkeletonBase)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ParticipantName = styled(SkeletonBase)`
  width: 80px;
  height: 20px;
  border-radius: 4px;
`;

const RecordSection = styled.div`
  margin-top: 40px;
`;

const RecordTitle = styled(SkeletonBase)`
  width: 100px;
  height: 24px;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const RecordInput = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const FileInput = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const RecordButton = styled(SkeletonBase)`
  width: 120px;
  height: 40px;
  border-radius: 8px;
`;

export default function ThirdPartyDetailSkeleton() {
  return (
    <Wrapper>
      <Header>
        <Title />
        <ButtonGroup>
          <Button />
          <Button />
        </ButtonGroup>
      </Header>
      
      <MainRow>
        <Content>
          <Field>
            <Label />
            <Input />
          </Field>
          <Field>
            <Label />
            <Input />
          </Field>
          <Field>
            <Label />
            <Input />
          </Field>
          <Field>
            <Label />
            <Input />
          </Field>
        </Content>

        <TimePanel>
          <Field>
            <Label />
            <Input />
          </Field>
          <Field>
            <Label />
            <DateInput />
          </Field>
          <TimeRow>
            <AmPmGroup>
              <AmPmButton />
              <AmPmButton />
            </AmPmGroup>
            <TimeInput />
            <TimeInput />
          </TimeRow>
        </TimePanel>
      </MainRow>

      <Participants>
        <ParticipantsTitle />
        <ParticipantList>
          {[1, 2, 3].map((i) => (
            <ParticipantCard key={i}>
              <Avatar />
              <ParticipantName />
            </ParticipantCard>
          ))}
        </ParticipantList>
      </Participants>

      <RecordSection>
        <RecordTitle />
        <RecordInput />
        <FileInput />
        <RecordButton />
      </RecordSection>
    </Wrapper>
  );
}
