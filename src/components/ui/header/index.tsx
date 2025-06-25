'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import * as S from './style'

// public/icons 아래로 옮겼다고 가정
const MENU_ITEMS = [
  { label: '홈', path: '/', icon: '/icons/home.svg' },
  { label: '탐색', path: '/explore', icon: '/icons/compass.svg' },
  { label: '모임', path: '/meetings', icon: '/icons/hands.svg' },
  { label: '프로필', path: '/profile', icon: '/icons/person.svg' },
  { label: '만들기', path: '/creating', icon: '/icons/create.svg' },
  { label: '하숙관리(제3자)', path: '/boarding/third-party', icon: '/icons/location.svg' },
  { label: '모임관리(제3자)', path: '/meeting/third-party', icon: '/icons/person_setting.svg' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleMenuClick = (path: string) => {
    router.push(path)
  }

  return (
    <S.HeaderContainer>
      <Image
        src="/logo.svg"
        alt="로고"
        width={77}
        height={60.5}
        priority
      />
      <S.Menu>
        {MENU_ITEMS.map(({ label, path, icon }) => {
          const active = path === '/' ? pathname === '/' : pathname.startsWith(path)
          return (
            <S.MenuItem
              key={path}
              active={active}
              onClick={() => handleMenuClick(path)}
            >
              <Image
                src={icon}
                alt={label}
                width={24}
                height={24}
              />
              <div>{label}</div>
            </S.MenuItem>
          )
        })}
      </S.Menu>
      <S.HeaderBottom>
        <S.Profile>
          <Image
            src="/icons/person.svg"
            alt="프로필"
            width={24}
            height={24}
          />
          <span>xx._un8</span>
        </S.Profile>
        <S.Logout>
          <Image
            src="/icons/logout.svg"
            alt="로그아웃"
            width={24}
            height={24}
          />
          <span>로그아웃</span>
        </S.Logout>
      </S.HeaderBottom>
    </S.HeaderContainer>
  )
}