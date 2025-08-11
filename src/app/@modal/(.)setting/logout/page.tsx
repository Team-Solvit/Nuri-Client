'use client'

import { useRouter } from 'next/navigation'
import Logout from '@/components/ui/logout'

export default function LogoutModalPage() {
  const router = useRouter()

  return (
    <Logout
      onLogout={() => {
        console.log('로그아웃 처리 완료')
        router.back()
      }}
      onClose={() => router.back()}
    />
  )
}