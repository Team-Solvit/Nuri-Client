export interface RegisterFormData {
  terms1: boolean; terms2: boolean; terms3: boolean; terms4: boolean; terms5: boolean; terms6: boolean; terms7: boolean;
  name: string; username: string;
  email: string; verificationCode: string;
  password: string; confirmPassword: string;
  nationality: string; language: string;
}

export const createInitialRegisterForm = (): RegisterFormData => ({
  terms1: false, terms2: false, terms3: false,
  terms4: false, terms5: false, terms6: false, terms7: false,
  name: '', username: '',
  email: '', verificationCode: '',
  password: '', confirmPassword: '',
  nationality: '', language: '',
});
