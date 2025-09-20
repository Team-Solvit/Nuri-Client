import type { Metadata } from 'next';
import PrivacyContainer from '@/containers/terms/PrivacyContainer';

export const metadata: Metadata = {
  title: '개인정보 수집·이용 동의 - 누리',
  description: '누리 개인정보 수집 및 이용에 관한 안내',
};

export default function Page() {
  return <PrivacyContainer />;
}
