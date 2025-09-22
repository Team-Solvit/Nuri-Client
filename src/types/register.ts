export interface RegisterFormData {
  terms1: boolean; terms2: boolean; terms3: boolean;
  name: string; username: string;
  email: string; verificationCode: string;
  password: string; confirmPassword: string;
  nationality: string; language: string;
}

export const createInitialRegisterForm = (): RegisterFormData => ({
  terms1: false, terms2: false, terms3: false,
  name: '', username: '',
  email: '', verificationCode: '',
  password: '', confirmPassword: '',
  nationality: '', language: '',
});
