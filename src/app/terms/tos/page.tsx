import type { Metadata } from 'next';
import TosContainer from '@/containers/terms/TosContainer';

export const metadata: Metadata = {
  title: '서비스 이용약관 - 누리',
  description: '누리 서비스 이용약관 전문',
};

export default function Page() {
  return <TosContainer />;
}
