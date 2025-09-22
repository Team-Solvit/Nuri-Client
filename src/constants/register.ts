export const REGISTER_STEPS = ['이용약관', '활동정보', '인증', '비밀번호', '국적'] as const;

export const COUNTRY_OPTIONS = [
  { value: '', label: '국적을 선택해주세요' },
  { value: 'KR', label: '대한민국' },
  { value: 'US', label: '미국' },
  { value: 'JP', label: '일본' },
  { value: 'CN', label: '중국' },
  { value: 'TW', label: '대만' },
  { value: 'HK', label: '홍콩' },
  { value: 'VN', label: '베트남' },
  { value: 'TH', label: '태국' },
  { value: 'SG', label: '싱가포르' },
  { value: 'MY', label: '말레이시아' },
  { value: 'ID', label: '인도네시아' },
  { value: 'PH', label: '필리핀' },
  { value: 'IN', label: '인도' },
  { value: 'GB', label: '영국' },
  { value: 'FR', label: '프랑스' },
  { value: 'DE', label: '독일' },
  { value: 'CA', label: '캐나다' },
  { value: 'AU', label: '호주' },
  { value: 'OTHER', label: '기타' },
];

export const LANGUAGE_OPTIONS = [
  { value: '', label: '언어를 선택해주세요' },
  { value: 'KO', label: '한국어' },
  { value: 'EN', label: '영어' },
];

export const USERNAME_PATTERN = /^[a-zA-Z0-9]{4,16}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;