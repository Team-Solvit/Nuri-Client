import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';
import { COUNTRY_OPTIONS, LANGUAGE_OPTIONS } from '@/constants/register';
import Image from 'next/image';
import { memo } from 'react';

interface Props { form: RegisterFormData; onChange: (k: keyof RegisterFormData, v: any) => void; }
export const StepProfile = memo(({ form, onChange }: Props) => {
  return (
    <>
      <S.Title>국적과 사용할 언어를 선택해주세요.</S.Title>
      <S.FormGroup>
        <S.Label>국적</S.Label>
        <S.SelectWrapper>
          <S.Select value={form.nationality} onChange={e => onChange('nationality', e.target.value)}>
            {COUNTRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </S.Select>
          <Image src="/icons/dropdown.svg" alt="드롭다운 화살표" width={20} height={20} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </S.SelectWrapper>
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>언어</S.Label>
        <S.SelectWrapper>
          <S.Select value={form.language} onChange={e => onChange('language', e.target.value)}>
            {LANGUAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </S.Select>
          <Image src="/icons/dropdown.svg" alt="드롭다운 화살표" width={20} height={20} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </S.SelectWrapper>
      </S.FormGroup>
    </>
  );
});
StepProfile.displayName = 'StepProfile';
