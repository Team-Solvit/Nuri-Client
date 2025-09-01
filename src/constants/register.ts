export const REGISTER_STEPS = ['이용약관', '활동정보', '인증', '비밀번호', '국적'] as const;

export const COUNTRY_OPTIONS = [
  { value: '', label: '국적을 선택해주세요' },
  { value: '대한민국', label: '🇰🇷 대한민국' },
  { value: 'US', label: '🇺🇸 미국' },
  { value: 'JP', label: '🇯🇵 일본' },
  { value: 'CN', label: '🇨🇳 중국' },
  { value: 'DE', label: '🇩🇪 독일' },
  { value: 'FR', label: '🇫🇷 프랑스' },
  { value: 'GB', label: '🇬🇧 영국' },
  { value: 'OT', label: '🌍 기타' },
];

export const LANGUAGE_OPTIONS = [
  { value: '', label: '언어를 선택해주세요' },
  { value: '한국어', label: '🇰🇷 한국어' },
  { value: 'EN', label: '🇺🇸 영어' },
  { value: 'JP', label: '🇯🇵 일본어' },
  { value: 'CN', label: '🇨🇳 중국어' },
  { value: 'VN', label: '🇻🇳 베트남어' },
  { value: 'DE', label: '🇩🇪 독일어' },
  { value: 'FR', label: '🇫🇷 프랑스어' },
  { value: 'OT', label: '🌍 기타' },
];

export const USERNAME_PATTERN = /^[a-zA-Z0-9]{4,16}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
