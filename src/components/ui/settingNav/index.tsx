'use client'

import {usePathname} from 'next/navigation'
import Image from 'next/image'
import * as S from './style'
import {useState, useEffect} from 'react'
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';

const MENU_SECTIONS = [
	{
		title: '개인 정보',
		items: [
			{label: '개인 정보 설정', path: '/setting', icon: '/icons/private.svg'},
			{label: '프로필 편집', path: '/setting/profile', icon: '/icons/profileSetting.svg'},
		],
	},
	{
		title: '인증',
		items: [
			{label: '호스트 인증', path: '/setting/host', icon: '/icons/host.svg'},
			{label: '하숙생 인증', path: '/setting/boarder', icon: '/icons/host.svg'},
		],
	},
	{
		title: '계정',
		items: [
			{label: '로그아웃', path: '/setting/logout', icon: '/icons/logout.svg'},
			{label: '회원탈퇴', path: '/setting/leave', icon: '/icons/leave.svg'},
		],
	},
]

interface SettingNavProps {
	onLogoutClick?: () => void
	onLeaveClick?: () => void
	onClose?: () => void
}

export default function SettingNav({onLogoutClick, onLeaveClick, onClose}: SettingNavProps) {
	const pathname = usePathname()
	const { role } = useUserStore(s => s);
	const { success, error: showError } = useAlertStore();
	const [isMobile, setIsMobile] = useState(false)
	
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 430)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	const filteredMenuSections = MENU_SECTIONS.map(section => {
		if (section.title === '인증') {
			if (role === 'HOST' || role === 'INTERNATIONAL_STUDENT') {
				return { ...section, items: [] };
			}
		}
		return section;
	}).filter(section => section.items.length > 0);
	
	const navigate = useNavigationWithProgress();
	const handleMenuClick = (path: string, label: string) => {
		if (label === '로그아웃') {
			onLogoutClick?.()
		} else if (label === '회원탈퇴') {
			onLeaveClick?.()
		} else {
			if (label === '하숙생 인증') {
				const hostPhoneVerified = localStorage.getItem('hostPhoneVerified');
				if (hostPhoneVerified === 'true' && role === 'USER') {
					showError('호스트 설정을 완료해주세요.');
					navigate('/setting/host');
					onClose?.();
					return;
				}
			}
			if ((label === '호스트 인증' || label === '하숙생 인증') && (role === 'HOST' || role === 'INTERNATIONAL_STUDENT')) {
				if (role === 'HOST') {
					success('호스트 인증이 완료된 상태입니다.');
				} else if (role === 'INTERNATIONAL_STUDENT') {
					success('하숙생 인증이 완료된 상태입니다.');
				} else {
					success('인증이 완료된 상태입니다.');
				}
				onClose?.();
				return;
			}
			navigate(path)
			onClose?.()
		}
	}
	
	if (isMobile) {
		return (
			<S.Overlay onClick={onClose}>
				<S.ModalWrapper onClick={(e) => e.stopPropagation()}>
					<S.Top>
						<S.Title>설정</S.Title>
						<S.Button onClick={onClose}>X</S.Button>
					</S.Top>
					{filteredMenuSections.map(section => (
						<div key={section.title}>
							<S.SectionTitle>{section.title}</S.SectionTitle>
							{section.items.map(({label, path, icon}) => {
								const active = pathname === path
								return (
									<S.MenuItem
										key={path}
										active={active}
										onClick={() => handleMenuClick(path, label)}
									>
										<Image src={icon} alt={label} width={20} height={20}/>
										<span>{label}</span>
									</S.MenuItem>
								)
							})}
						</div>
					))}
				</S.ModalWrapper>
			</S.Overlay>
		)
	}
	
	return (
		<S.Container>
			<S.Main>
				<S.Title>설정</S.Title>
				{filteredMenuSections.map(section => (
					<div key={section.title}>
						<S.SectionTitle>{section.title}</S.SectionTitle>
						{section.items.map(({label, path, icon}) => {
							const active = pathname === path
							return (
								<S.MenuItem
									key={path}
									active={active}
									onClick={() => handleMenuClick(path, label)}
								>
									<Image src={icon} alt={label} width={20} height={20}/>
									<span>{label}</span>
								</S.MenuItem>
							)
						})}
					</div>
				))}
			</S.Main>
		</S.Container>
	)
}
