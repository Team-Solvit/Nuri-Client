import { USERNAME_PATTERN, EMAIL_PATTERN } from '@/constants/register';

export interface TermsData { terms1: boolean; terms2: boolean; terms3: boolean; }
export interface AccountData { name: string; username: string; usernameChecked: boolean; usernameAvailable: boolean; }
export interface EmailData { email: string; code: string; verified: boolean; }
export interface PasswordData { password: string; confirmPassword: string; }
export interface ProfileData { nationality: string; language: string; }

export const validateTerms = (d: TermsData) => (
  d.terms1 && d.terms2 && d.terms3 ? null : '모든 약관에 동의해야 합니다.'
);

export const validateAccount = (d: AccountData) => {
  if (!d.name.trim() || !d.username.trim()) return '이름과 아이디를 모두 입력해주세요.';
  if (!USERNAME_PATTERN.test(d.username)) return '아이디는 영문/숫자 4~16자로 입력해주세요.';
  if (!d.usernameChecked || !d.usernameAvailable) return '아이디 중복 확인이 필요합니다.';
  return null;
};

export const validateEmail = (d: EmailData) => {
  if (d.verified) return null;
  if (!d.email.trim()) return '이메일을 입력해주세요.';
  if (!EMAIL_PATTERN.test(d.email)) return '올바른 이메일 형식이 아닙니다.';
  if (!d.code.trim()) return '이메일과 인증번호를 모두 입력해주세요.';
  return '이메일 인증이 필요합니다.';
};

export const validatePassword = (d: PasswordData) => {
  if (!d.password.trim() || !d.confirmPassword.trim()) return '비밀번호와 비밀번호 재입력을 모두 입력해주세요.';
  if (d.password.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
  if (d.password !== d.confirmPassword) return '비밀번호가 일치하지 않습니다.';
  return null;
};

export const validateProfile = (d: ProfileData) => {
  if (!d.nationality.trim() || !d.language.trim()) return '국적과 언어를 모두 선택해주세요.';
  return null;
};
