import styled from '@emotion/styled';
import { SkeletonBase } from './animations';
import { mq } from '@/styles/media';

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 600px;
  max-height: 80vh;
  overflow-y: auto;

  ${mq.mobile} {
    min-width: unset;
    width: 100%;
    padding: 20px;
    max-height: 90vh;
    gap: 20px;
  }
`;

const Title = styled(SkeletonBase)`
  width: 120px;
  height: 28px;
  border-radius: 6px;
  margin-bottom: 8px;
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

const TextArea = styled(SkeletonBase)`
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

const Select = styled(SkeletonBase)`
  width: 100%;
  height: 44px;
  border-radius: 8px;
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImagePlaceholder = styled(SkeletonBase)`
  width: 100%;
  height: 120px;
  border-radius: 8px;
`;

const UploadButton = styled(SkeletonBase)`
  width: 150px;
  height: 40px;
  border-radius: 6px;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

const Button = styled(SkeletonBase)`
  flex: 1;
  height: 44px;
  border-radius: 8px;
`;

export default function GroupEditModalSkeleton() {
  return (
    <Wrapper>
      <Title />
      
      <Field>
        <Label />
        <Input />
      </Field>

      <Field>
        <Label />
        <TextArea />
      </Field>

      <Row>
        <Field style={{ flex: 1 }}>
          <Label />
          <Input />
        </Field>
        <Field style={{ flex: 1 }}>
          <Label />
          <Select />
        </Field>
      </Row>

      <Field>
        <Label />
        <ImageUploadSection>
          <ImagePlaceholder />
          <UploadButton />
        </ImageUploadSection>
      </Field>

      <Field>
        <Label />
        <ImageUploadSection>
          <ImagePlaceholder />
          <UploadButton />
        </ImageUploadSection>
      </Field>

      <ButtonGroup>
        <Button />
        <Button />
      </ButtonGroup>
    </Wrapper>
  );
}
