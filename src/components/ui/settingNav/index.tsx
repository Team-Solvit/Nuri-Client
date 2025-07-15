'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import * as S from './style'

const MENU_SECTIONS = [
    {
        title: '개인 정보',
        items: [
            { label: '개인 정보 설정', path: '/setting', icon: '/icons/private.svg' },
            { label: '프로필 편집', path: '/setting/profile', icon: '/icons/profileSetting.svg' },
        ],
    },
    {
        title: '언어',
        items: [
            { label: '언어 설정', path: '/setting/language', icon: '/icons/language.svg' },
        ],
    },
    {
        title: '인증',
        items: [
            { label: '호스트 인증', path: '/setting/host', icon: '/icons/host.svg' },
        ],
    },
    {
        title: '계정',
        items: [
            { label: '로그아웃', path: '/setting/logout', icon: '/icons/logout.svg' },
            { label: '회원탈퇴', path: '/setting/leave', icon: '/icons/leave.svg' },
        ],
    },
]
interface SettingNavProps {
    onLogoutClick?: () => void;
}

export default function SettingNav({ onLogoutClick }: SettingNavProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleMenuClick = (path: string, label: string) => {
        if (label === '로그아웃') {
            onLogoutClick?.()
        } else {
            router.push(path)
        }
    };

    return (
        <S.Container>
            <S.Main>
                <S.Title>설정</S.Title>
                {MENU_SECTIONS.map(section => (
                    <div key={section.title}>
                        <S.SectionTitle>{section.title}</S.SectionTitle>
                        {section.items.map(({ label, path, icon }) => {
                            const active = pathname === path;
                            return (
                                <S.MenuItem
                                    key={path}
                                    active={active}
                                    onClick={() => handleMenuClick(path, label)}
                                >
                                    <Image src={icon} alt={label} width={20} height={20} />
                                    <span>{label}</span>
                                </S.MenuItem>
                            );
                        })}
                    </div>
                ))}
            </S.Main>
        </S.Container>
    );
}
