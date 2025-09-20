'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as S from './style'
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useUserStore } from '@/store/user'

const MENU_ITEMS = [
	{ label: '홈', path: '/', icon: '/icons/home.svg', order: 0 },
	{ label: '탐색', path: '/explore', icon: '/icons/compass.svg', order: 1 },
	{ label: '만들기', path: '/creating', icon: '/icons/create.svg', order: 2 },
	{ label: '모임', path: '/meetings', icon: '/icons/hands.svg', order: 3 },
	{ label: '프로필', path: '/profile', icon: '/icons/person.svg', order: 4 },
	{ label: '하숙관리(제3자)', path: '/boarding/third-party', icon: '/icons/location.svg', order: 99, isThirdParty: true },
	{ label: '모임관리(제3자)', path: '/meeting/third-party', icon: '/icons/person_setting.svg', order: 99, isThirdParty: true },
];

const HIDDEN_PATHS = ['/register', '/message'];

export default function Header() {
	const pathname = usePathname();
	const navigate = useNavigationWithProgress();
	const { userId, role } = useUserStore(s => s);
	
	const [isMobile, setIsMobile] = useState(false);
	const [moreOpen, setMoreOpen] = useState(false);
	const moreRef = useRef<HTMLDivElement | null>(null);
	const moreBarRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 430);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (!moreOpen) return;

		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			const target = e.target as Node;
			const isInsideTrigger = moreRef.current?.contains(target);
			const isInsideBar = moreBarRef.current?.contains(target);
			
			if (!isInsideTrigger && !isInsideBar) {
				setMoreOpen(false);
			}
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMoreOpen(false);
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [moreOpen]);

	const shouldHideHeader = () => {
		return isMobile && HIDDEN_PATHS.some(path => pathname.startsWith(path));
	};

	const getFilteredMenuItems = () => {
		return MENU_ITEMS.filter(item => !item.isThirdParty || role === 'THIRD_PARTY');
	};

	const getMenuItems = () => {
		const filteredMenu = getFilteredMenuItems();
		
		if (!isMobile) {
			return { primaryItems: filteredMenu, extraItems: [] };
		}

		return {
			primaryItems: filteredMenu.filter(item => item.order < 99),
			extraItems: filteredMenu.filter(item => item.order >= 99)
		};
	};

	const handleMenuClick = (path: string) => {
		navigate(path);
		setMoreOpen(false);
	};

	const isMenuActive = (path: string) => {
		return path === '/' ? pathname === '/' : pathname.startsWith(path);
	};

	if (shouldHideHeader()) return null;

	const { primaryItems, extraItems } = getMenuItems();

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
				{primaryItems.map(({ label, path, icon, order }) => (
					<S.MenuItem
						key={path}
						label={label}
						active={isMenuActive(path)}
						order={order}
						onClick={() => handleMenuClick(path)}
					>
						<Image src={icon} alt={label} width={24} height={24} />
						<div>{label}</div>
					</S.MenuItem>
				))}

				{isMobile && extraItems.length > 0 && (
					<S.MoreWrap ref={moreRef}>
						<S.MenuItem
							key="more"
							onClick={() => setMoreOpen(prev => !prev)}
							aria-haspopup="menu"
							aria-expanded={moreOpen}
						>
							<S.MoreIcon open={moreOpen}>
								<Image src="/icons/dropdown.svg" alt="더보기" width={24} height={24} />
							</S.MoreIcon>
						</S.MenuItem>
					</S.MoreWrap>
				)}
			</S.Menu>

			{isMobile && extraItems.length > 0 && (
				<S.MoreBar open={moreOpen} ref={moreBarRef}>
					{extraItems.map(({ label, path, icon }) => (
						<S.MoreAction key={path} onClick={() => handleMenuClick(path)}>
							<Image src={icon} alt={label} width={20} height={20} />
							<span>{label}</span>
						</S.MoreAction>
					))}
				</S.MoreBar>
			)}

			<S.HeaderBottom>
				<S.Profile>
					<Image
						src="https://avatars.githubusercontent.com/u/193513016?s=200&v=4"
						alt="프로필"
						width={36}
						height={36}
						style={{ borderRadius: '50%' }}
						unoptimized={true}
					/>
					<span>{userId || '로그인을 해주세요'}</span>
				</S.Profile>
				
				<S.Report>
					<Image src="/icons/warningBell.svg" alt="신고하기" width={24} height={24} />
					<span>신고하기</span>
				</S.Report>
			</S.HeaderBottom>
		</S.HeaderContainer>
	)
}