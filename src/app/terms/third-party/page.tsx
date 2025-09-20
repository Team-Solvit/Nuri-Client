import type { Metadata } from 'next';
import ThirdPartyContainer from '@/containers/terms/ThirdPartyContainer';

export const metadata: Metadata = {
  title: '개인정보 제3자 제공 동의 - 누리',
  description: '누리 개인정보 제3자 제공에 관한 안내',
};

export default function Page() {
  return <ThirdPartyContainer />;
}
