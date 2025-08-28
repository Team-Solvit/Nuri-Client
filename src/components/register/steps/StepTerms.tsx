import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';

interface Props {
  form: RegisterFormData;
  onChange: (key: keyof RegisterFormData, value: any) => void;
}

export const StepTerms = ({ form, onChange }: Props) => {
  const allChecked = form.terms1 && form.terms2 && form.terms3 && form.terms4 && form.terms5 && form.terms6 && form.terms7;
  const toggleAll = (checked: boolean) => ['terms1', 'terms2', 'terms3', 'terms4', 'terms5', 'terms6', 'terms7'].forEach(k => onChange(k as keyof RegisterFormData, checked));
  return (
    <>
      <S.Title>아래의 내용을 동의해야 서비스를 이용할 수 있어요.</S.Title>
      <S.CheckboxGroup style={{ marginBottom: '1.2rem' }}>
        <S.CheckboxItem>
          <S.Checkbox id="allTerms" type="checkbox" checked={allChecked} onChange={e => toggleAll(e.target.checked)} />
          <S.CheckboxLabel htmlFor="allTerms" style={{ fontWeight: 600 }}>약관 전체동의</S.CheckboxLabel>
        </S.CheckboxItem>
      </S.CheckboxGroup>
      <S.SectionBox>누리 약관 및 동의사항</S.SectionBox>
      <S.CheckboxGroup>
        {['terms1', 'terms2', 'terms3'].map((t, i) => (
          <S.CheckboxItem key={t}>
            <S.Checkbox type="checkbox" id={t} checked={form[t as 'terms1']} onChange={e => onChange(t as keyof RegisterFormData, e.target.checked)} />
            <S.CheckboxLabel htmlFor={t}>{['서비스 이용약관', '개인정보 수집 이용 동의', '개인정보 제3자 제공 동의'][i]}</S.CheckboxLabel>
          </S.CheckboxItem>
        ))}
      </S.CheckboxGroup>
      <S.SectionBox>본인 인증 약관 및 동의사항</S.SectionBox>
      <S.CheckboxGroup>
        {['terms4', 'terms5', 'terms6', 'terms7'].map((t, i) => (
          <S.CheckboxItem key={t}>
            <S.Checkbox type="checkbox" id={t} checked={form[t as 'terms4']} onChange={e => onChange(t as keyof RegisterFormData, e.target.checked)} />
            <S.CheckboxLabel htmlFor={t}>{['본인 확인 서비스 이용약관(중계기관)', '개인정보 수집 이용 및 위탁 동의', '본인 확인 서비스 고유식별정보 처리 동의사항', '본인확인 서비스 이용약관(본인확인기관)'][i]}</S.CheckboxLabel>
          </S.CheckboxItem>
        ))}
      </S.CheckboxGroup>
    </>
  );
};
StepTerms.displayName = 'StepTerms';
