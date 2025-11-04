import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';
import { memo } from 'react';
import Link from 'next/link';

interface Props {
  form: RegisterFormData;
  onChange: (key: keyof RegisterFormData, value: RegisterFormData[keyof RegisterFormData]) => void;
}

export const StepTerms = memo(({ form, onChange }: Props) => {
  const allChecked = form.terms1 && form.terms2 && form.terms3;
  const toggleAll = (checked: boolean) => ['terms1', 'terms2', 'terms3'].forEach(k => onChange(k as keyof RegisterFormData, checked));

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
        {([
          { key: 'terms1', label: '서비스 이용약관 (필수)', href: '/terms/tos' },
          { key: 'terms2', label: '개인정보 수집·이용 동의 (필수)', href: '/terms/privacy' },
          { key: 'terms3', label: '개인정보 제3자 제공 동의 (필수)', href: '/terms/third-party' },
        ]).map(({ key, label, href }) => (
          <S.CheckboxItem key={key}>
            <S.Checkbox type="checkbox" id={key} checked={form[key as 'terms1' | 'terms2' | 'terms3']} onChange={e => onChange(key as keyof RegisterFormData, e.target.checked)} />
            <S.CheckboxLabel htmlFor={key}>{label}</S.CheckboxLabel>
            <Link href={href} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', color: '#555', textDecoration: 'underline' }}>전문보기</Link>
          </S.CheckboxItem>
        ))}
      </S.CheckboxGroup>
    </>
  );
});
StepTerms.displayName = 'StepTerms';


